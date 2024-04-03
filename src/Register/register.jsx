import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { doCreateUserWithEmailAndPassword } from '../auth'
import { useAuth } from '../authContext/index'
import Header from '../component/header'


const Register = () => {
    const userLoggedIn = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    };

    return (
        <div className='flex items-center justify-center my-8'>
            {/* <div>
                <Header />
            </div> */}
            {/* <div className='flex items-center justify-cente my-2'> */}
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div className='lg:my-16 mx-8 bg-slate-200 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative my-20'>
                <h1 className='text-4xl  font-bold text-center mb-6'>Register</h1>
                <form action=''
                    onSubmit={handleSubmit}
                >
                    <div className='realtive my-14'>
                        <input type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='block lg:w-72 md:w-72 sm:w-64 pt-2 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer' placeholder='' />
                        <label htmlFor='' className='absolute top-32 text-sm duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:top-32 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-fous:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Email</label>

                    </div>
                    <div className='realtive my-5'>
                        <input type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='block lg:w-72 md:w-72 sm:w-64 .pt-2 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer' placeholder='' />
                        <label htmlFor='' className='absolute text-sm duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:top-52 top-52 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-fous:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Password</label>

                    </div>
                    <div className='realtive mt-14'>
                        <input type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='block lg:w-72 md:w-72 sm:w-64 pt-2 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer' placeholder='' />
                        <label htmlFor='' className='absolute text-sm duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:top-72 top-72 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-fous:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Confirm Password</label>

                    </div>

                    {/* Error message */}
                    {errorMessage && (
                        <span className='text-red-600 font-bold'>{errorMessage}</span>
                    )}
                    <button
                        className={`w-full mb-4 text-sm mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors:duration-300'
                         ${isRegistering}`} type='submit' disabled={isRegistering}
                    >
                        {isRegistering ? <Navigate to='/login' /> : 'Register'}
                    </button>


                    {/* <button className='w-full mb-4 text-sm mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors:duration-300' type='submit'>Register</button> */}
                    <div>
                        <span className='my-4'>Already have an Account? <Link to='/login' className='text-blue-500'>Login</Link></span>
                    </div>
                </form>
            </div>
            {/* </div>   */}
        </div>
    )
}

export default Register;
