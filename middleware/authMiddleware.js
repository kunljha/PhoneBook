const jwt = require('jsonwebtoken')
const config = require('config')

const requireAuth = (req, res, next) => {
	// get token from header
	const token = req.header('x-auth-token')

	if (!token) {
		return res.status(401).json({ msg: 'No token, access is denied!' })
	}
	// verifyng token
	jwt.verify(token, config.get('jwtSecret'), (err, decodedToken) => {
		if (err) {
			res.status(401).json({ msg: 'Token is not valid' })
		} else {
			// console.log(decodedToken)
			req.user = decodedToken.user
			next()
		}
	})
}

module.exports = requireAuth
