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
            <form action='m-4' onSubmit={handleSubmit}>


                <div className='flex justify-end mx-4 '>
                    

                    <button className={` flex  items-center  mb-4 text-md mt-6 rounded bg-white text-blue-500 uppercase py-2 transition-colors:duration-300 ${isSigningOut}`} type='submit' disabled={isSigningOut}>
                    <svg className="h-8 w-8 text-blue-500 mx-1 "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                        
                        
                        {isSigningOut ? <Navigate to='/login' /> : 'Sign Out'}
                    </button>
                </div>

                <div className='m-40 lg:flex lg:flex-row items-center justify-center font-serif font-bold text-white md:m-10 sm:m-10 sm:flex sm:flex-col flow'>
                    {/* <form action='m-4' onSubmit={handleSubmit}> */}



                    {/* <div> */}
                        <Link to="/upload"
                            className=' bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] hover:animate-pulse bg-blue-700 overflow-hidden rounded-xl border border-blue-300 bg-[length:300%_300%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]  my-8 mx-4 px-6 py-20'>Cloud Storage
                            {/* className='backdrop-blur-lg to-transparent from-blue-400 bg-gradient-to-br backdrop-saturate-180 bg-opacity-75 bg-blue rounded-lg border border-white border-opacity-25 p-4 text-lg items-center  my-8 mx-4 px-6 py-20'> Cloud Storage  */}
                        </Link>
                        {/* </div> */}

                        {/* <div> */}
                        <Link to="/crudreal"
                            className=' bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] bg-blue-700 overflow-hidden rounded-xl border border-blue-300 bg-[length:300%_300%,100%_100%] bg-[position:-100%_0,0_0]  bg-no-repeat shadow-2xl transition-[background-position_0s_ease]  hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]  my-8 mx-4 px-6 py-20'> Crud Real Time DB

                            {/* className='inline-flex text-lg items-center border rounded text-blue-600 border-blue-500   my-8 mx-4  px-6 py-20'> Crud Real Time DB  */}
                        </Link>
                        {/* </div> */}

                        {/* <div> */}
                        <Link to="/crud"
                            className='bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] bg-blue-700 overflow-hidden rounded-xl border border-blue-300 bg-[length:300%_300%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]  my-8 mx-4 px-6 py-20'> Crud Firestore
                            {/* className='inline-flex text-lg items-center border rounded text-blue-600 mx-4 border-blue-500  my-8 mx-4 px-6 py-20'>  Crud Firestore */}
                        </Link>
                    {/* </div> */}


            {/* </form> */}

        </div>            </form>
 </div >

    )
}

export default Home;