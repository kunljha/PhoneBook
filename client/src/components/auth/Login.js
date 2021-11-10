import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = () => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)
	const { setAlert } = alertContext
	const { loginUser, clearErrors, errors, isAuthenticated } = authContext

	const history = useHistory()
	useEffect(() => {
		if (isAuthenticated) {
			history.push('/') // redirect to home route
		}

		if (
			errors === 'Email is not registered!' ||
			errors === 'Password is wrong!'
		) {
			setAlert(errors, 'danger')
			clearErrors()
		}
	}, [errors, isAuthenticated, history])

	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (email === '' || password === '') {
			setAlert('Please enter all fields!', 'danger')
		} else {
			loginUser({
				email,
				password,
			})
		}
	}

	const { email, password } = user

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Login</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Email Address</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleChange}
					/>
				</div>
				<input
					type='submit'
					value='Login'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	)
}

export default Login
