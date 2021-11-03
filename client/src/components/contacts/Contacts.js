import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
	const contactContext = useContext(ContactContext)
	const { contacts, filtered } = contactContext

	if (contacts.length === 0) {
		return <h3 style={{ textAlign: 'center' }}>No contacts to show.</h3>
	}

	return (
		<Fragment>
			{filtered
				? filtered.map((contact) => (
						<ContactItem key={contact.id} contact={contact} />
				  ))
				: contacts.map((contact) => (
						<ContactItem key={contact.id} contact={contact} />
				  ))}
		</Fragment>
	)
}

export default Contacts
