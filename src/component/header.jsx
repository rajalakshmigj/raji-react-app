import React from 'react'
import { Link  } from 'react-router-dom';

const Header = () => {
    return (
        <div className='w-full text-center flex justify-end px-32 py-7'>
                        <div className='flex items-center mx-4'>
            <Link to='/home'><button
                    className='border border-blue-600 rounded-lg hover:border hover:border-blue-500 p-2 hover:bg-blue-500 hover:text-white hover:rounded-full mx-2'
                >
                        Home
                   
                </button> </Link>
                
                <Link to='/login'><button
                    className='border border-blue-600 rounded-lg hover:border hover:border-blue-500 p-2 hover:bg-blue-500 hover:text-white hover:rounded-full mx-2'
                >
                   
                        Login
                    
                </button></Link>
                <Link to='/register'><button
                    className='border border-blue-600 rounded-lg hover:border hover:border-blue-500 p-2 hover:bg-blue-500 hover:text-white hover:rounded-full mx-2'
                >
                  
                        Register
                   
                </button> </Link>
            </div>
        </div>
    )
}

export default Header