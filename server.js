const express = require('express')
const path = require('path')
const connectToDB = require('./db')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes')
const config = require('config')

const app = express() // initialise express-app

// connect to DB
connectToDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server listening for requests on port ${PORT}`)
})

app.use(express.json({ extended: false })) // parses json data of request into javascript data

// app.get('/', (req, res) => {
// 	res.send('Hello from Express Server')
// })

// routes
const apiUrl = config.get('apiUrl')
app.use(`${apiUrl}/api/users`, userRoutes)
app.use(`${apiUrl}/api/auth`, authRoutes)
app.use(`${apiUrl}/api/contacts`, contactRoutes)

// check environment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}
