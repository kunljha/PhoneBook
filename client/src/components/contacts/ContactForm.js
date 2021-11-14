import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import AlertContext from '../../context/alert/alertContext'

const ContactForm = () => {
	const contactContext = useContext(ContactContext)
	const alertContext = useContext(AlertContext)
	const { addContact, updateContact, clearCurrent, current, errors } =
		contactContext
	const { setAlert } = alertContext

	useEffect(() => {
		if (current) {
			setContact(current)
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			})
		}
	}, [current, addContact])

	// component-level state
	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	})
	const { name, email, phone, type } = contact // destructuring contact state

	// handlers
	const handleChange = (e) => {
		setContact({
			...contact,
			[e.target.name]: e.target.value,
		})
	}

	// email validation using regex
	const validateEmail = () => {
		const regex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
		if (!email || regex.test(email) === false) {
			return false
		}
		return true
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (name === '' || email === '' || phone === '') {
			setAlert('Please enter all fields!', 'danger')
		} else if (!validateEmail(email)) {
			setAlert('Please enter a valid email!', 'danger')
		}

		if (validateEmail(email)) {
			if (!current) {
				addContact(contact)
			} else {
				updateContact(contact)
				setAlert('Contact Updated!', 'primary')
			}
			clearCurrent()
		}
	}

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
