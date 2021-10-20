const express = require('express')
const { validationResult, check } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const router = express.Router()

router.post(
	'/',
	[
		check('name', 'Please enter your name').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check(
			'password',
			'Please enter a password of minimun 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, password } = req.body
		try {
			let user = await User.findOne({ email })
			if (user) {
				return res
					.status(400)
					.json({ msg: 'User already exists with this email!' })
			}
			// creating instance of user
			user = new User({
				name,
				email,
				password,
			})
			// hashing password with bcrypt before saving in db
			const salt = await bcrypt.genSalt()
			user.password = await bcrypt.hash(password, salt)
			// saving the user in db
			const userSaved = await user.save()
			res.status(201).json({ user: userSaved })
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Something went wrong!')
		}
	}
)

module.exports = router
