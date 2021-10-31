import React, { useState, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
	const contactContext = useContext(ContactContext)

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	})

	const handleChange = (e) => {
		setContact({
			...contact,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		contactContext.addContact(contact)
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal',
		})
	}

	const { name, email, phone, type } = contact

	return (
		<form onSubmit={handleSubmit}>
			<h2 className='text-primary'>Add Contact</h2>
			<input
				type='text'
				placeholder='Enter Name..'
				name='name'
				value={name}
				onChange={handleChange}
			/>
			<input
				type='email'
				placeholder='Enter Email..'
				name='email'
				value={email}
				onChange={handleChange}
			/>
			<input
				type='text'
				placeholder='Enter Phone..'
				name='phone'
				value={phone}
				onChange={handleChange}
			/>
			<h5>Contact Type</h5>
			<input
				type='radio'
				name='type'
				value='personal'
				onChange={handleChange}
				checked={type === 'personal'}
			/>
			Personal{' '}
			<input
				type='radio'
				name='type'
				value='professional'
				onChange={handleChange}
				checked={type === 'professional'}
			/>
			Professional{' '}
			<div>
				<input
					type='submit'
					value='Add Contact'
					className='btn btn-primary btn-block'
				/>
			</div>
		</form>
	)
}

export default ContactForm
