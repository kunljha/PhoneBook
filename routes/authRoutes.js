const express = require('express')
const config = require('config')
const { validationResult, check } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const requireAuth = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', requireAuth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		res.json(user)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Something went wrong!')
	}
})

router.post(
	'/',
	[
		check('email', 'Please enter a valid email!').isEmail(),
		check(
			'password',
			'Please enter a password of minimun 6 or more characters'
		).exists(),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body
		try {
			let user = await User.findOne({ email })
			// if user does not exist in db
			if (!user) {
				return res.status(400).json({ msg: 'Email is not registered!' })
			}
			const isMatch = await bcrypt.compare(password, user.password)
			//  if passworrd did not match
			if (!isMatch) {
				return res.status(400).json({ msg: 'Password is wrong!' })
			}

			const payload = {
				user: {
					id: user.id,
				},
			}

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 1 * 24 * 60 * 60 },
				(err, token) => {
					if (err) throw new err()
					res.json({ token })
				}
			)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Something went wrong!')
		}
	}
)

module.exports = router
