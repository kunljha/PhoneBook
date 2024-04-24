import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
const config = require('config')
const uri = config.get('mongoURI')

import Contact from './models/Contact'
import User from './models/User'

try {
  await mongoose.connect(uri)
  const user = await User.findOne({ email: 'admin@gmail.com' })
  const contacts = JSON.parse(
    await readFile(new URL('./mockData.json', import.meta.url))
  )
  const allContacts = contacts.map((contact) => {
    return { ...contact, user: user._id }
  })
  await Contact.deleteMany({ user: user._id })
  await Contact.create(allContacts)
  console.log('success')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
