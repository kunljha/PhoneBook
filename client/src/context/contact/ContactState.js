import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {
	ADD_CONTACT,
	UPDATE_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERRORS,
} from '../types'

const ContactState = (props) => {
	const initialState = {
		contacts: [],
		current: null,
		filtered: null,
		errors: null,
	}

	// useReducer hook
	const [state, dispatch] = useReducer(ContactReducer, initialState)

	// add contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		try {
			const res = await axios.post('/api/contacts', contact, config)
			dispatch({
				type: ADD_CONTACT,
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: CONTACT_ERRORS,
				payload: err.response.data.errors,
			})
		}
	}

	// update contact
	const updateContact = (contact) => {
		dispatch({
			type: UPDATE_CONTACT,
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

	// filter contacts
	const filterContacts = (text) => {
		dispatch({
			type: FILTER_CONTACTS,
			payload: text.toLowerCase(),
		})
	}

	// clear contact
	const clearFilter = () => {
		dispatch({
			type: CLEAR_FILTER,
		})
	}

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				errors: state.errors,
				addContact,
				updateContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				filterContacts,
				clearFilter,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	)
}

export default ContactState
