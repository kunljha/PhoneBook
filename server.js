const express = require('express')

const app = express() // initialise express-app

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server listening for requests on port ${PORT}`)
})

app.get('/', (req, res) => {
	res.send('Hello from Express Server')
})
