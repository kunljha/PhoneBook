import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
	const contactContext = useContext(ContactContext) // initializing context
	const { addContact, updateContact, clearCurrent, current } = contactContext // destructuring

	useEffect(() => {
		if (current) {
			setContact({
				id: current.id,
				name: current.name,
				email: current.email,
				phone: current.phone,
				type: current.type,
			})
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			})
		}
	}, [current])

	// component-level state
	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	})

	// handlers
	const handleChange = (e) => {
		setContact({
			...contact,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!current) {
			addContact(contact)
		} else {
			updateContact(contact)
		}

		clearCurrent()
	}

	const { name, email, phone, type } = contact // destructuring contact state

	return (
		<form onSubmit={handleSubmit}>
			<h2 className='text-primary'>
				{current ? 'Edit Contact' : 'Add Contact'}
			</h2>
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
					value={current ? 'Update Contact' : 'Add Contact'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button
						className='btn btn-light btn-block'
						onClick={() => clearCurrent()}
					>
						Clear
					</button>
				</div>
			)}
		</form>
	)
}

export default ContactForm
