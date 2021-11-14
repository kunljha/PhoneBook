import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contacts = () => {
	const contactContext = useContext(ContactContext)
	const { contacts, filtered, loading, getContacts } = contactContext

	useEffect(() => {
		getContacts()
	}, [])

	if (loading) {
		return <Spinner />
	}

	if (contacts.length === 0 && !loading) {
		return <h3 style={{ textAlign: 'center' }}>No contacts to show.</h3>
	}

	return (
		<Fragment>
			{filtered
				? filtered.map((contact) => (
						<ContactItem key={contact._id} contact={contact} />
				  ))
				: contacts.map((contact) => (
						<ContactItem key={contact._id} contact={contact} />
				  ))}
		</Fragment>
	)
}

export default Contacts
