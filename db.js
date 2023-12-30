const mongoose = require('mongoose')
const config = require('config')
const uri = config.get('mongoURI')

mongoose.set('strictQuery', true)
const connectToDB = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.log(err.message)
      process.exit(1)
    })
}

module.exports = connectToDB
