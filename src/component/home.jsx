import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";


const Home = () => {
  const auth = getAuth();

  const [isSigningOut, setIsSigningOut] = useState(false);

  async function doSignOut() {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isSigningOut) {
      setIsSigningOut(true);
      await doSignOut();
      setIsSigningOut(false);
    }
  }

  return (
    <div>
     
      <div className='m-10 flex items-center justify-center'>
        <form action='m-4' onSubmit={handleSubmit}>

        <div>
            <Link to="/upload" 
            className='inline-flex text-lg items-center border rounded-full text-blue-600 border-blue-500  font-medium my-8 px-6 py-1'> Cloud Storage 
            </Link>
          </div>

          <div>
            <Link to="/crudreal" 
            className='inline-flex text-lg items-center border rounded-full text-blue-600 border-blue-500  font-medium my-8 px-6 py-1'> Crud Real Time Database 
            </Link>
          </div>
          
          <div>
            <Link to="/crud"  className='inline-flex text-lg items-center border rounded-full text-blue-600 border-blue-500 font-medium my-8 px-6 py-1'>  Crud Firebase Firestore
            </Link>
          </div>

          <button className={`w-full mb-4 text-sm mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors:duration-300 ${isSigningOut}`} type='submit' disabled={isSigningOut}>
            {isSigningOut ? <Navigate to='/login' /> : 'Sign Out'}
          </button>

        </form>

      </div> </div>

  )
}

export default Home;