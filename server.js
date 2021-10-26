const express = require('express')
const connectToDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express() // initialise express-app

// connect to DB
connectToDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server listening for requests on port ${PORT}`)
})

app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello from Express Server')
})

// routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactRoutes)
