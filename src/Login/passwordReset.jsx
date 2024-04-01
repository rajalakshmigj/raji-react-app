import React, { useState } from 'react'
import { auth } from '../firebase';
import { Link, Navigate } from 'react-router-dom';
// import { useAuth } from '../../Contexts/authContext'
import { doPasswordReset } from '../auth';

// import {sendPasswordResetEmail, doPasswordReset}  from '../../auth';

const PasswordRest = () => {

  // const currentUser = useAuth()

  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleResetPassword = async () => {
    try {
      await doPasswordReset(email)
      // await auth.sendPasswordResetEmail(email);
      setResetSent(true);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setErrorMessage('Error sending password reset email. Please enter your email.');
    }

  };

  return (

    <div className='my-24 flex flex-col justify-center items-center bg-white mx-auto p-5'>
      <h1 className='my-2 text-blue-500 font-semibold text-3xl text-center'>Reset Your Password</h1>
      <p className='my-2 font-medium text-black text-base text-center'>Please enter your email address below. You will receive the link to reset your password</p>
      <div className='relative '><svg className='absolute left-0 bottom-0 top-3'
        width="35px" height="35px" viewBox="-1.2 -1.2 26.40 26.40" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.72"></g><g id="SVGRepo_iconCarrier"><path d="M13.025 17H3.707l5.963-5.963L12 12.83l2.33-1.794 1.603 1.603a5.463 5.463 0 0 1 1.004-.41l-1.808-1.808L21 5.9v6.72a5.514 5.514 0 0 1 1 .64V5.5A1.504 1.504 0 0 0 20.5 4h-17A1.504 1.504 0 0 0 2 5.5v11A1.5 1.5 0 0 0 3.5 18h9.525c-.015-.165-.025-.331-.025-.5s.01-.335.025-.5zM3 16.293V5.901l5.871 4.52zM20.5 5c.009 0 .016.005.025.005L12 11.57 3.475 5.005c.009 0 .016-.005.025-.005zm-2 8a4.505 4.505 0 0 0-4.5 4.5 4.403 4.403 0 0 0 .05.5 4.49 4.49 0 0 0 4.45 4h.5v-1h-.5a3.495 3.495 0 0 1-3.45-3 3.455 3.455 0 0 1-.05-.5 3.498 3.498 0 0 1 5.947-2.5H20v.513A2.476 2.476 0 0 0 18.5 15a2.5 2.5 0 1 0 1.733 4.295A1.497 1.497 0 0 0 23 18.5v-1a4.555 4.555 0 0 0-4.5-4.5zm0 6a1.498 1.498 0 0 1-1.408-1 1.483 1.483 0 0 1-.092-.5 1.5 1.5 0 0 1 3 0 1.483 1.483 0 0 1-.092.5 1.498 1.498 0 0 1-1.408 1zm3.5-.5a.5.5 0 0 1-1 0v-3.447a3.639 3.639 0 0 1 1 2.447z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
        <input type='email' required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='block w-72 sm:w-60 my-2 py-2.5 px-10 text-sm  bg-transparent border border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer' placeholder='Enter Your Email Address' />
      </div>
      <button onClick={handleResetPassword} disabled={resetSent} className='border border-blue-500 bg-blue-500 text-white font-semibold px-4 py-2.5 my-3' >
        {resetSent ? 'Reset Link Sent' : 'Reset Your Password'}
      </button>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <div className="flex float-right mr-2 screen-xxsl:w-full screen-xxsl:float-none screen-xxsl:justify-center screen-xxsl:mt-8">
        <div className="text-right float-right">
          <Link to='/login' className="flex screen-xxsl:mt-8 mt-3 pl-[0.15rem] screen-xxsl:text-xnormal hover:cursor-pointer text-xlnormal font-normal text-blue-800" >
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
            >
              <path
                d="M14.3587 28.7178C22.2761 28.7178 28.7173 22.2763 28.7173 14.3588C28.7173 6.44146 22.2761 0 14.3587 0C6.44133 0 0 6.44146 0 14.3588C0 22.2763 6.44133 28.7178 14.3587 28.7178ZM14.3587 1.96562C21.1922 1.96562 26.7517 7.52517 26.7518 14.3588C26.7518 21.1925 21.1924 26.7521 14.3587 26.7522C7.52517 26.7521 1.96575 21.1925 1.96575 14.3587C1.96575 7.5253 7.52517 1.96562 14.3587 1.96562Z"
                fill="#4C5ADB"
              />
              <path
                d="M12.4304 20.5089C12.8142 20.8926 13.4365 20.8924 13.8202 20.5089C14.2042 20.1249 14.2042 19.5027 13.8201 19.1188L10.0435 15.3423L20.9798 15.3413C21.5225 15.3411 21.9625 14.9012 21.9625 14.3582C21.9623 13.8154 21.5224 13.3756 20.9796 13.3756L10.0429 13.3767L13.8205 9.59942C14.2043 9.2156 14.2043 8.59316 13.8205 8.20947C13.6285 8.01762 13.377 7.92157 13.1254 7.92157C12.874 7.92157 12.6225 8.01762 12.4305 8.20934L6.9754 13.6643C6.79102 13.8486 6.6875 14.0985 6.6875 14.3592C6.68763 14.62 6.79115 14.8698 6.97553 15.0544L12.4304 20.5089Z"
                fill="#4C5ADB"
              />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
      {/* <div>
        <button>
          Back to Login
        </button>
      </div> */}
    </div>
  )
}

export default PasswordRest