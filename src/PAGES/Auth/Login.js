// import React from 'react'
// import { Link } from 'react-router-dom'
// import Navbar from '../../COMPONENTS/Navbar/Navbar'
// import './AuthPage.css'

// const Login = () => {
//     return (
//         <div className='authpage'>
//             <Navbar />

//             <div className='authcont'>
//                 <img src='https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt='noimg' />
//                 <form className='authform'>
//                     <h1>Login</h1>
//                     <div className='formgroup'>
//                         <label htmlFor='email'>Email</label>
//                         <input type='email' name='email' id='email' />
//                     </div>
//                     <div className='formgroup'>
//                         <label htmlFor='password'>Password</label>
//                         <input type='password' name='password' id='password' />
//                     </div>

//                     <Link to='/forgotpassword' style={{ textDecoration: 'none', width: '100%' }}>
//                     <p>Forgot Password?</p>
//                     </Link>
                    
//                      <Link to='/' style={{textDecoration:'none', width:'100%'}}>
//                         <button type='submit'>Login</button>
//                     </Link>
//                     <h2
//                         className='or'
//                     >OR</h2>
//                     <Link to='/signup'
//                      style={{textDecoration:'none', width:'100%'}}
//                     >
//                         <button type='submit'>Signup</button>
//                     </Link>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login