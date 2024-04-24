import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const PrivateRoute = () => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, loading } = authContext

  return !isAuthenticated && !loading ? <Navigate to='/about' /> : <Outlet />
}

export default PrivateRoute
