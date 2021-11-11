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

const contactReducer = (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload],
			}
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) => {
					return contact.id === action.payload.id ? action.payload : contact
				}),
			}
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter((contact) => {
					return contact.id !== action.payload
				}),
			}
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			}
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			}
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					return (
						contact.name.toLowerCase().includes(action.payload) ||
						contact.email.toLowerCase().includes(action.payload)
					)
				}),
			}
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			}
		case CONTACT_ERRORS:
			return {
				...state,
				errors: action.payload,
			}
		default:
			return state
	}
}

export default contactReducer
