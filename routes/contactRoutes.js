const express = require('express')
const { validationResult, check } = require('express-validator')
const requireAuth = require('../middleware/authMiddleware')
const Contact = require('../models/Contact')

const router = express.Router()

// get all contacts of a user
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

// add a new contact
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
			console.error(err)
			res.status(500).json({ msg: 'Something went wrong!' })
		}
	}
)

// update a contact
router.put('/:id', requireAuth, async (req, res) => {
	const { name, email, phone, type } = req.body

	const contactFields = {}
	if (name) contactFields.name = name
	if (email) contactFields.email = email
	if (phone) contactFields.phone = phone
	if (type) contactFields.type = type

	try {
		const contact = await Contact.findById(req.params.id)

		if (!contact) {
			return res.status(404).json({ msg: 'Contact does not exist!' })
		}
		// making sure user updates its own contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Unauthorized User!' })
		}

		const updatedContact = await Contact.findByIdAndUpdate(
			req.params.id,
			{
				$set: contactFields,
			},
			{ new: true }
		)
		res.json(updatedContact)
	} catch (err) {
		console.error(err)
		res.status(500).json({ msg: 'Something went wrong!' })
	}
})

// delete a contact
router.delete('/:id', requireAuth, async (req, res) => {
	try {
		const contact = await Contact.findById(req.params.id)

		if (!contact) {
			return res.status(404).json({ msg: 'Contact does not exist!' })
		}
		// making sure user deletes its own contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Unauthorized User!' })
		}

		await Contact.findByIdAndRemove(req.params.id)
		res.json({ msg: 'Contact deleted' })
	} catch (err) {
		console.error(err.message)
		res.status(500).json({ msg: 'Something went wrong!' })
	}
})

module.exports = router
