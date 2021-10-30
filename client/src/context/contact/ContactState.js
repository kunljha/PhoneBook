import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import { ADD_CONTACT } from '../types'

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Jane Simpson',
				phone: '111-111-1111',
				email: 'jane@gmail.com',
				type: 'personal',
			},
			{
				id: 2,
				name: 'Kyle Damon',
				phone: '222-222-2222',
				email: 'kyle@gmail.com',
				type: 'professional',
			},
			{
				id: 3,
				name: 'James Alonso',
				phone: '333-333-3333',
				email: 'james@gmail.com',
				type: 'personal',
			},
		],
	}

	// useReducer hook
	const [state, dispatch] = useReducer(ContactReducer, initialState)

	// add contact

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	)
}

export default ContactState
