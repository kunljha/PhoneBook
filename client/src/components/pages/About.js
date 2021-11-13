import React from 'react'

const About = () => {
	return (
		<div>
			<h2>About</h2>
			<h4 className='my-1 lead'>
				This is a Full Stack <span className='text-primary lead'>MERN</span> App
			</h4>
			<h4>
				The Backend server is built with{' '}
				<span className='text-primary lead'>Express</span> and the frontend is
				built with <span className='text-primary lead'>React</span>.
			</h4>
			<h4>
				I have implemented <span className='text-primary lead'>ContextAPI</span>{' '}
				to manage App-level-state with useReducer hook and useContext hook.
			</h4>
		</div>
	)
}

export default About
