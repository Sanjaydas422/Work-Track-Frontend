import React from 'react'
import "./Login.css"

const Login = () => {
  return (
    
    <div>
      <form>
        <label className='signup-label' htmlFor="">Email:</label>
        <input className='signup-input' type="email"  placeholder='Enter your email'/> <br /><br />

        <label className='signup-label' htmlFor="">Password:</label>
        <input className='signup-input' type="password" placeholder='Enter your password'/> <br /><br />

        <button id='logbutton' >Login</button>
      </form>
    </div>
    
  )
}

export default Login
