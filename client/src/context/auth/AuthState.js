import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	CLEAR_ERRORS,
	USER_LOADED,
	AUTH_ERROR,
} from '../types'

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		errors: null,
	}

	const [state, dispatch] = useReducer(AuthReducer, initialState)

	// load user
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token)
		}

		try {
			const res = await axios.get('/api/auth')
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
			})
		}
	}

	// register user
	const registerUser = async (formdata) => {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		}
		try {
			const res = await axios.post('/api/users', formdata, config)
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			})

			loadUser()
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data,
			})
		}
	}

	// clear error
	const clearErrors = () => {
		dispatch({
			type: CLEAR_ERRORS,
		})
	}

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				errors: state.errors,
				registerUser,
				clearErrors,
				loadUser,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState
