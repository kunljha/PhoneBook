import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext)
	const { user, logout } = authContext
	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={icon} /> {title}
			</h1>
			{user ? (
				<ul>
					<li>
						<a href='#!' onClick={() => logout()}>
							<i className='fas fa-sign-out-alt' /> Logout
						</a>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Link to='/about'>About</Link>
					</li>
					<li>
						<Link to='/register'>Register</Link>
					</li>
					<li>
						<Link to='/login'>Login</Link>
					</li>
				</ul>
			)}
		</div>
	)
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
}

Navbar.defaultProps = {
	title: 'PhoneBook',
	icon: 'fas fa-address-book',
}

export default Navbar
