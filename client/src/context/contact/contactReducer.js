import {
	GET_CONTACTS,
	ADD_CONTACT,
	UPDATE_CONTACT,
	DELETE_CONTACT,
	CLEAR_CONTACTS,
	SET_CURRENT,
	CLEAR_CURRENT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERRORS,
} from '../types'

const contactReducer = (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false,
			}
		case ADD_CONTACT:
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
				loading: false,
			}
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) => {
					return contact._id === action.payload._id ? action.payload : contact
				}),
				loading: false,
			}
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter((contact) => {
					return contact._id !== action.payload
				}),
				loading: false,
			}
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: [],
				current: null,
				filtered: null,
				loading: true,
				errors: null,
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
