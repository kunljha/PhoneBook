import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = () => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)
  const { setAlert } = alertContext
  const { registerUser, clearErrors, errors, isAuthenticated } = authContext

  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/') // redirect to home route
    }

    if (errors === 'User already exists with this email!') {
      setAlert(errors, 'danger')
      clearErrors()
    }
  }, [errors, isAuthenticated, navigate])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = user

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  // email validation using regex
  const validateEmail = (input) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email || regex.test(email) === false) {
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields!', 'danger')
    } else if (!validateEmail(email)) {
      setAlert('Please enter a valid email!', 'danger')
    } else if (password.length < 6) {
      setAlert('Minimum length of password should be six characters!', 'danger')
    } else if (password !== password2) {
      setAlert('Passwords do not match!', 'danger')
    } else {
      registerUser({
        name,
        email,
        password,
      })
    }
  }

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={handleChange} />
        </div>
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
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={handleChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
        <Link to='/login' className='btn btn-primary btn-block text-center'>
          Already registered? Login
        </Link>
      </form>
    </div>
  )
}

export default Register
