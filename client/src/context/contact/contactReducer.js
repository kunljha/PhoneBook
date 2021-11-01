import { ADD_CONTACT, DELETE_CONTACT } from '../types'

const contactReducer = (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload],
			}
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter((contact) => {
					return contact.id !== action.payload
				}),
			}
		default:
			return state
	}
}

export default contactReducer
