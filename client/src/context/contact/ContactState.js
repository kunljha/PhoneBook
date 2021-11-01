import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
} from '../types'

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Jane Simpson',
				email: 'jane@gmail.com',
				phone: '111-111-1111',
				type: 'personal',
			},
			{
				id: 2,
				name: 'Kyle Damon',
				email: 'kyle@gmail.com',
				phone: '222-222-2222',
				type: 'professional',
			},
			{
				id: 3,
				name: 'James Alonso',
				email: 'james@gmail.com',
				phone: '333-333-3333',
				type: 'personal',
			},
		],
		current: null,
	}

	// useReducer hook
	const [state, dispatch] = useReducer(ContactReducer, initialState)

	// add contact
	const addContact = (contact) => {
		contact.id = uuidv4()
		dispatch({
			type: ADD_CONTACT,
			payload: contact,
		})
	}

	// delete contact
	const deleteContact = (id) => {
		dispatch({
			type: DELETE_CONTACT,
			payload: id,
		})
	}

	// set current
	const setCurrent = (contact) => {
		dispatch({
			type: SET_CURRENT,
			payload: contact,
		})
	}

	// clear current
	const clearCurrent = () => {
		dispatch({
			type: CLEAR_CURRENT,
		})
	}

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	)
}

export default ContactState
