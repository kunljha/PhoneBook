import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	CLEAR_ERRORS,
	USER_LOADED,
	AUTH_ERROR,
} from '../types'

const authReducer = (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false,
			}
		case REGISTER_FAIL || AUTH_ERROR:
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				errors: action.payload.msg,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				errors: null,
			}
		default:
			return state
	}
}

export default authReducer
