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
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types'

const AuthState = (props) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL

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
      const res = await axios.get(`${apiUrl}/api/auth`)
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
      const res = await axios.post(`${apiUrl}/api/users`, formdata, config)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  // login user
  const loginUser = async (formdata) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }
    try {
      const res = await axios.post(`${apiUrl}/api/auth`, formdata, config)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  // logout user
  const logout = () => {
    dispatch({
      type: LOGOUT,
    })
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
        loginUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
