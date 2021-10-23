const express = require('express')
const { validationResult, check } = require('express-validator')
const requireAuth = require('../middleware/authMiddleware')
const Contact = require('../models/Contact')

const router = express.Router()

router.get('/', requireAuth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		})
		res.json(contacts)
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ msg: 'Something went wrong!' })
	}
})

router.post(
	'/',
	[
		requireAuth,
		[
			check('name', 'Please add a name of contact').not().isEmpty(),
			check('email', 'Please add a valid email of contact').isEmail(),
			check('phone', 'Please add phone number of contact'),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, phone, type } = req.body
		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			})

			const contact = await newContact.save()
			res.json(contact)
		} catch (err) {
			console.error(err.message)
			res.status(500).json({ msg: 'Something went wrong!' })
		}
	}
)

router.put('/:id', (req, res) => {
	res.send('Update a contact')
})

router.delete('/:id', (req, res) => {
	res.send('Delete a contact')
})

module.exports = router
