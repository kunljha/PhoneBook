import React, { useState } from 'react'

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal' 
  })

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    })
  }

  const { name, email, phone, type } = contact

  return (
    <form>
      <h2 className="text-primary">Add Contact</h2>
      <input 
        type="text"
        placeholder='Enter Name..' 
        name='name' 
        value={name} 
        onChange={handleChange}  
      />
      <input 
        type="email"
        placeholder='Enter Email..' 
        name='email' 
        value={email} 
        onChange={handleChange}  
      />
      <input 
        type="text"
        placeholder='Enter Phone..' 
        name='phone' 
        value={phone} 
        onChange={handleChange}  
      />
      <h5>Contact Type</h5>
      <input 
        type="radio" 
        name='type' 
        value='personal' 
        checked={ type === 'personal' } />Personal{' '}
       <input 
        type="radio" 
        name='type' 
        value='personal' 
        checked={ type === 'personal' } />Personal{' '}
      <div>
        <input 
          type="submit" 
          value="Add Contact" 
          className="btn btn-primary btn-block" />
      </div>
    </form>
  )
}

export default ContactForm
