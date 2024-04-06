import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getDatabase, set, push, ref, get, remove } from "firebase/database";
import { app } from "../firebase"

const CrudReal = () => {
    let [inputValue1, setInputValue1] = useState("");
    let [inputValue2, setInputValue2] = useState("");
    let [fruitArray, setFruitsArray] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const saveData = async () => {

        if (!inputValue1 || !inputValue2) {
            alert("Both fields must have values.");
            return;
        }

        //Create Data From Firebase
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "nature/fruti"));
        const newFruitId = newDocRef.key;
        set(newDocRef, {
            fruitId: newFruitId,
            fruitName: inputValue1,
            fruiteDef: inputValue2
        }).then(() => {
            fetchData();
            setInputValue1("");
            setInputValue2("");
        }).catch((error) => {
            alert("Error", error.message)
        })
    }

    //Read and Display Data From Firebase
    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "nature/fruti");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const temp = Object.keys(data).map(myfirebaseId => {
                return {
                    ...data[myfirebaseId],
                    fruitId: myfirebaseId
                }
            })
            setFruitsArray(temp);
        } else {
            console.log("No data found at specified path - ");
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (fruitId) => {
        const fruitToEdit = fruitArray.find(item => item.fruitId === fruitId);
        if (fruitToEdit) {
            setInputValue1(fruitToEdit.fruitName);
            setInputValue2(fruitToEdit.fruiteDef);
            setEditingId(fruitId);
        }
    };
    const updateData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "nature/fruti/" + editingId);
        await set(dbRef, {
            fruitName: inputValue1,
            fruiteDef: inputValue2
        });
        setInputValue1("");
        setInputValue2("");
        setEditingId(null);
        fetchData();
    }

    const deleteFruit = async (fruitIdParam) => {
        const confirmed = window.confirm('Are you sure you want to delete?');
        if (!confirmed) return;
        try {
            const db = getDatabase(app);
            const newDocRef = ref(db, "nature/fruti/" + fruitIdParam);
            await remove(newDocRef);

            setFruitsArray(fruitArray.filter(fruit => fruit.fruitId !== fruitIdParam));

        } catch (error) {
            console.error("Error deleting :", error);
        }
    }

    return (
        <div>
            <div className='flex justify-end px-32 py-7 sm:px-0 '>
                <Link to='/home'><button
                    className='border border-blue-600 hover:rounded-lg hover:border hover:border-blue-500 p-2 hover:bg-blue-500 hover:text-white rounded-full mx-2'
                >
                    Back To Home
                </button>
                </Link>

            </div>

            <div className='m-10'>

                <h1 className='text-center m-2 text-red-400 text-2xl font-bold fadeInUp animated animatedFadeInUp '>Hey! Welcome to Firebase Realtime Database.</h1>

                <div className={`lg:flex lg:flex-row mx-auto items-center justify-center sm:flex sm:flex-col mt-16 mb-4`}>

                    <div className='text-center'>
                        <label className='font-bold'>Enter Todo: </label>
                        <input type='text' value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} className={`border-gray-500 border m-4`} />
                    </div>

                    <div className='text-center'>
                        <label className='font-bold'>Enter Todo Time: </label>
                        <input type='text' value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} className={`border-gray-500 border m-4`} />
                    </div>
                </div>
                <div className='flex justify-center m-4'>
                    <button onClick={editingId ? updateData : saveData} className={`bg-indigo-500 rounded-full text-white py-2 m-2 text-sm px-4`}>
                        {editingId ? 'Update Data' : 'Save Data'}
                    </button>
                </div>


                <div className='flex justify-center'>

                    <table className='w-96 border rounded'>
                        <thead className='text-center bg-gray-700 text-white'>
                            <tr className=''>
                                <td className=' p-2 font-bold'>Todo</td>
                                <td className=' p-2 font-bold'>Todo Time</td>
                                <td className=' p-2 font-bold hidden'>Firebase Id</td>
                                <td className=' p-2 font-bold'>Action</td>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {fruitArray ? (
                                fruitArray.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-200'}>
                                        <td className={index % 2 === 0 ? 'bg-white  p-2' : 'bg-neutral-200  p-2'}>{item.fruitName}</td>
                                        <td className={index % 2 === 0 ? 'bg-white  p-2' : 'bg-neutral-200  p-2'}>{item.fruiteDef}</td>
                                        <td className={index % 2 === 0 ? 'bg-white  p-2 hidden' : 'bg-neutral-200  p-2 hidden'}>{item.fruitId}</td>
                                        <td className={index % 2 === 0 ? 'bg-white  p-2 flex no-wrap justify-center' : 'bg-neutral-200  p-2 flex no-wrap justify-center'}>
                                            <button className="p-2" onClick={() => handleEdit(item.fruitId)}>
                                                <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                                    <line x1="16" y1="5" x2="19" y2="8" />
                                                </svg>
                                            </button>
                                            <button onClick={() => deleteFruit(item.fruitId)} className="m-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="p-4">No fruits available</td></tr>
                            )}
                        </tbody>

                        {/* <tbody className='text-center'>
                            {fruitArray ? (
                                fruitArray.map((item, index) => (
                                    <tr key={index} className=''>
                                        <td className=' p-2'> {item.fruitName} </td>
                                        <td className=' p-2'> {item.fruiteDef} </td>
                                        <td className=' p-2 hidden'> {item.fruitId} </td>
                                        <td className=' p-2'>
                                            <button className={` p-2 `} onClick={() => handleEdit(item.fruitId)}>
                                                <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                            </button>
                                            <button onClick={() => deleteFruit(item.fruitId)} className='m-2 ' >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <li>No fruits available</li>
                            )}
                        </tbody> */}

                    </table>
                </div>

            </div> </div>

    )
}

export default CrudReal;