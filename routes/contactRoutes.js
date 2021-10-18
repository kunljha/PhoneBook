const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send('Get all contacts')
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
