import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './AuthPage.css'
const ForgotPassword = () => {
  return (
    <div className='authpage'>
      <Navbar />

      <div className='authcont'>
      <img src='https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Flogin.png&w=1920&q=75'
                            alt='login' className='login__img' />
        {/* <img src='https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt='noimg' /> */}
        <form className='authform'>
          <h1>Forgot Password</h1>


          <div className='formgroup'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' />
          </div>

          {/* <div className='form-group-row'>
            <div className='formgroup'>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' id='password' />
            </div>

            <div className='formgroup'>
              <label htmlFor='password'>Confirm Password</label>
              <input type='password' name='password' id='password' />
            </div>
          </div>
          <Link to='/login' style={{ textDecoration: 'none', width: '100%' }}>
            <p>Already a user?</p>
          </Link> */}

          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword