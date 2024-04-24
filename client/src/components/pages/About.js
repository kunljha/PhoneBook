import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='container card bg-light'>
      <h2 className='text-primary my'>About</h2>
      <p className='py-1'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quae
        tempore deleniti, incidunt vero cumque facilis velit esse sit sunt alias
        nisi unde ipsam nulla, dolores suscipit. Commodi officia blanditiis
        ipsum, non iusto doloribus minima inventore eveniet reiciendis deserunt
        ex quaerat distinctio, iste neque incidunt. Officia, architecto?
        Cupiditate debitis dicta harum ab nostrum suscipit veniam doloribus
        necessitatibus, vero, nihil perspiciatis
      </p>
      {/* <button className='btn btn-danger btn-sm mx'>Take a test drive</button> */}
      <Link to='/register' className='btn btn-success btn-sm mx'>
        Register
      </Link>
      <Link to='/login' className='btn btn-dark btn-sm mx'>
        Login
      </Link>
    </div>
  )
}

export default About
