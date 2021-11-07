import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types'

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null,
	}

	const [state, dispatch] = useReducer(AuthReducer, initialState)

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
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg,
			})
		}
	}

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				registerUser,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState
