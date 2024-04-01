import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithPhoneNumber, getAuth, signInWithCredential, RecaptchaVerifier, PhoneAuthProvider } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Header from '../component/header'
import '../Login/loginPhone.scss'
import { useAuth } from '../authContext/index'


const LoginPhone = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userLoggedIn = useAuth()

  const handleSendOTP = async () => {
    try {
      const auth = getAuth();
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'visible' });
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
      setError(null);
      alert("OTP SENT")
    } catch (error) {
      setError(error.message);
    }
  };

  async function handleVerifyOTP() {
    try {

      const auth = getAuth();
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      const userToken = await user.getIdToken();
      alert("OTP Verified");
      // console.log('User authenticated with phone number:', user.phoneNumber);
      // console.log('User token:', userToken);
      navigate('/home');
    } catch (error) {
      setError("Invalid Verification Code");
    }
  }

  return (
    <div>
      <div className='flex justify-end px-32 py-7 sm:px-0'>
        <Link to='/login'><button
          className='border border-blue-600 hover:rounded-lg hover:border hover:border-blue-500 p-2 hover:bg-blue-500 hover:text-white rounded-full mx-2'
        >
          Back To Login
        </button>
        </Link>
      </div>
      <div className='flex flex-col items-center justify-center my-10 '>
        {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
        <div className='m-16  bg-slate-200 border border-slate-400 rounded-md p-8 sm:p-4 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
          <h1 className='text-4xl font-bold text-center mb-6'>Login</h1>

          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry="IN"
            className='block w-72 mb-2 py-2.3 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer'

          />

          <div id="recaptcha-container"></div>
          <button onClick={handleSendOTP}
            className={`w-full mb-4 text-sm mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors:duration-300`}
          >
            Send OTP
          </button>

          {error && <div style={{ color: 'red' }}>{error}</div>}

          {verificationId && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='block mt-4 w-72 py-3 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer'
              />
              <button onClick={handleVerifyOTP} className={`w-full mb-4 text-sm mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors:duration-300`}>Verify OTP</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPhone