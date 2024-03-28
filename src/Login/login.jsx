import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithPhoneNumber, doSignInWithCredential } from '../auth';
import { useAuth } from '../authContext/index'
import Header from '../component/header'
import LoginPhone from './loginPhone'
import { auth, browserSessionPersistence, setPersistence } from "../firebase";

const Login = () => {
    const userLoggedIn = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('rememberedEmail') && localStorage.getItem('rememberedPassword')) {
            setEmail(localStorage.getItem('rememberedEmail'));
            setPassword(localStorage.getItem('rememberedPassword'));
            setRememberMe(true);
        }
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await setPersistence(auth, browserSessionPersistence);
                await doSignInWithEmailAndPassword(email, password);
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                    localStorage.setItem('rememberedPassword', password);
                } else {
                    localStorage.removeItem('rememberedEmail');
                    localStorage.removeItem('rememberedPassword');
                }
            } catch (error) {
                alert("Invalid Email or Password")
                setErrorMessage(error.message);
            } finally {
                setIsSigningIn(false);
            }
        }
    }
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className='flex items-center justify-center m-auto my-5'>
                {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
                <div className='m-16 bg-slate-200 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
                    <h1 className='text-4xl font-bold text-center mb-6'>Login</h1>
                    <form action=''
                        onSubmit={handleSubmit}
                    >

                        <div className='realtive my-14'>
                            <input type='email'
                                // required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='block w-72 py-2.3 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer' placeholder='' />
                            <label htmlFor='' className='absolute top-32 text-sm duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:top-32 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-fous:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Email</label>

                        </div>

                        <div className='realtive my-5'>
                            <input type='password'
                                // required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='block w-72 py-2.3 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer' placeholder='' />
                            <label htmlFor='' className='absolute text-sm duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:top-52 top-52 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-fous:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Password</label>

                        </div>
                        {errorMessage && (
                            <span className='text-red-600 font-bold w-72 block'>{errorMessage}</span>
                        )}

                        <div className='flex justify-between items-center '>
                            <div className='flex gap-2 items-center my-4'>
                                <input type='checkbox' name='rememberMe' id='rememberMe' checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                                <label htmlFor='Remember Me'>Remember Me?</label>
                            </div>
                            <button>
                                <Link to='/pswdreset' className='text-blue-500'>
                                    Forgot Password?
                                </Link>
                            </button>
                        </div>


                        <div className='text-blue-500 text-center'>
                            <Link to='/loginphone'> Login using Phone Number </Link>
                        </div>

                        <button className={`w-full mb-4 text-sm mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors:duration-300 ${isSigningIn}`} type='submit'
                            disabled={isSigningIn}
                        >
                            {isSigningIn ? <Navigate to='/home' /> : 'Sign In'}
                        </button>
                        <div>
                            <span className='mt-4'>New Here? <Link to='/register' className='text-blue-500'>Create an Account</Link></span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login;