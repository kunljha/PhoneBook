const express = require('express')
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

router.post('/', (req, res) => {
	res.send('Add a new contact')
})

router.put('/:id', (req, res) => {
	res.send('Update a contact')
})

router.delete('/:id', (req, res) => {
	res.send('Delete a contact')
})

module.exports = router
