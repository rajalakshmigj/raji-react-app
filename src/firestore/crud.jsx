import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { dbFire } from '../firebase'
import { doc, addDoc, collection, updateDoc, deleteDoc, getDocs } from 'firebase/firestore'
// import Header from '../header/header'

const Crud = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fetchData, setFetchData] = useState([])
    const [id, setId] = useState()
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDelete = (id) => {
        setId(id);
        setShowConfirmation(true);
    }
    const confirmDelete = async () => {
        const delref = doc(dbref, id);
        try {
            await deleteDoc(delref);
            setFetchData(prevData => prevData.filter(item => item.id !== id));
            setShowConfirmation(false);
            alert("Deleted");
        } catch (error) {
            alert(error);
        }
    }



    //create databse ref
    const dbref = collection(dbFire, "CRUD")
    // Storing data to database
    const add = async () => {

        if (!name || !email || !phone) {
            alert("Please fill in all fields");
            return;
        }
        const addData = await addDoc(dbref, { Name: name, Email: email, Phone: phone })
        if (addData) {
            alert("Data Added");
            const newData = { Name: name, Email: email, Phone: phone };
            setFetchData(prevData => [...prevData, newData]);
            setName('');
            setEmail('');
            setPhone('');
        }
        else {
            alert('Error')
        }
    }

    //fetching data from db
    const fetch = async () => {
        const snapshot = await getDocs(dbref)
        const fetchData = snapshot.docs.map((doc => ({ ...doc.data(), id: doc.id })))
        setFetchData(fetchData)
    }
    useEffect(() => {
        fetch()
    }, [])

    //pass update data to form
    const passData = async (id) => {
        const matchId = fetchData.find((data) => {
            return data.id === id
        })
        setName(matchId.Name)
        setEmail(matchId.Email)
        setPhone(matchId.Phone)
        setId(matchId.id)
    }

    //update the data
    const update = async () => {
        if (!name || !email || !phone) {
            alert("Select the data to be updated");
            return;
        }
        const updateref = doc(dbref, id)
        try {
            await updateDoc(updateref, { Name: name, Email: email, Phone: phone })
            const updatedData = fetchData.map(item => {
                if (item.id === id) {
                    return { ...item, Name: name, Email: email, Phone: phone };
                }
                return item;
            });
            setFetchData(updatedData);
            alert("Updated")
            setName('');
            setEmail('');
            setPhone('');
        } catch (error) {

            alert(error, "Update Error")
        }
    }


    return (
        <div>
            <div className='flex justify-end px-32 py-7 sm:px-0'>
                <Link to='/home'><button
                    className='border border-blue-600 hover:rounded-lg hover:border hover:border-blue-500 p-2 hover:bg-blue-500 hover:text-white rounded-full mx-2'
                >
                    Back To Home

                </button> </Link>

            </div>
            <div className=''>
                <h1 className='text-center m-2 text-red-400 text-2xl font-bold fadeInUp animated animatedFadeInUp '>Welcome to Firestore</h1>
                <div className='bg-white py-5 px-7 my-0 mt-12 mx-auto w-80 shadow-xl'>
                    <h2 className='text-center text-black text-base font-semibold uppercase'>Add/ Update Form</h2>
                    <div className='w-full '>
                        <input type='text' className='w-full py-2.5 px-0 border border-x-white border-t-white outline-none border-b-[#868686] text-black' placeholder='Full Name' autoComplete='Off' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='w-full '>
                        <input type='email' className='w-full py-2.5 px-0 border border-x-white border-t-white outline-none border-b-[#868686] text-black' placeholder='E-mail' autoComplete='Off' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='w-full '>
                        <input type='text' className='w-full py-2.5 px-0 border border-x-white border-t-white outline-none border-b-[#868686] text-black ' placeholder='Phone Number' autoComplete='Off' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <button className='ml-5 px-7 py-3 border-none outline-none bg-blue-600 text-white mt-5 cursor-pointer' onClick={add}>Add</button>
                    <button className='ml-5 px-7 py-3 border-none outline-none bg-blue-600 text-white mt-5 cursor-pointer' onClick={update}>Update</button>
                </div>
                <div className='px-10 py-5 w-full'>
                    <h2 className='text-black text-lg uppercase font-semibold'>CRUD Database</h2>
                    <div className='flex flex-wrap max-w-full'>
                        {
                            fetchData.map((data) => {
                                return (
                                    <>
                                        <div className='py-2.5 px-5 mt-5 ml-4 mb-2 h-52 screen-xs:h-60 bg-white rounded-md'>
                                            <h3 className='mt-3 text-base text-black'>Name : {data.Name}</h3>
                                            <h3 className='mt-3 text-base text-black'>E-mail : {data.Email} </h3>
                                            <h3 className='mt-3 text-base text-black'>Phone : {data.Phone} </h3>
                                            <div>
                                                <button className='mt-4 ml-5 px-5 py-2.5 bg-blue-500 text-white outline-none border-none cursor-pointer' onClick={() => passData(data.id)}>Update</button>
                                                <button className='mt-4 ml-5 px-5 py-2.5 bg-blue-500 text-white outline-none border-none cursor-pointer' onClick={() => handleDelete(data.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }


                    </div>
                </div>
            </div>
            {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <p className="text-center text-lg mb-4">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-4" onClick={confirmDelete}>Yes</button>
                            <button className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded" onClick={() => setShowConfirmation(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Crud