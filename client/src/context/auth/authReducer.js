import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types'

const authReducer = (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false,
			}
		case REGISTER_FAIL:
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			}
		default:
			return state
	}
}

export default authReducer
