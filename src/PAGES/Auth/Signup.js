import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../COMPONENTS/Navbar/Navbar'

const Signup = () => {
    return (
        <div className='authpage'>
            <Navbar />

            <div className='authcont'>
                <img src='https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt='noimg' />
                <form className='authform'>
                    <h1>Signup</h1>

                    {/* first name , last name */}
                    <div className='form-group-row'>
                        <div className='formgroup'>
                            <label htmlFor='firstname'>First Name</label>
                            <input type='text' name='firstname' id='firstname' />
                        </div>

                        <div className='formgroup'>
                            <label htmlFor='lastname'>Last Name</label>
                            <input type='text' name='lastname' id='lastname' />
                        </div>
                    </div>

                    <div className='formgroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' />
                    </div>

                    <div className='form-group-row'>
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
                    </Link>

                    <button type='submit'>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup