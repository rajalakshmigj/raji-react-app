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
        const db = getDatabase(app);
        const newDocRef = ref(db, "nature/fruti/" + fruitIdParam);
        await remove(newDocRef);
        window.location.reload();
    }

    return (
        <div>
            <div className='flex justify-end px-32 py-7'>
                <Link to='/home'><button
                className='border border-blue-600 hover:rounded-lg hover:border hover:border-blue-500 p-2 hover:bg-blue-500 hover:text-white rounded-full mx-2'
                >
                    Home
                </button>
                </Link>

            </div>

            <div className='m-10'>

                <h1 className='text-center m-2 text-red-300 text-2xl font-bold'>Hello, you are now logged in.</h1>

                <div className={`flex mx-auto items-center mt-16 mb-4 justify-center`}>

                    <div>
                        <label className='font-bold'>Enter Todo: </label>
                        <input type='text' value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} className={`border-gray-500 border m-4`} />
                    </div>

                    <div>
                        <label className='font-bold'>Enter Todo Time: </label>
                        <input type='text' value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} className={`border-gray-500 border m-4`} />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button onClick={editingId ? updateData : saveData} className={`bg-indigo-500 rounded-full text-white py-2 m-2 text-sm px-4`}>
                        {editingId ? 'Update Data' : 'Save Data'}
                    </button>
                </div>


                <div className='flex flex-col items-center m-4'>

                    <table className='border border-neutral-300'>
                        <thead className='text-center'>
                            <tr className='border border-neutral-300'>
                                <td className='border border-neutral-300 p-2 font-bold'>Todo</td>
                                <td className='border border-neutral-300 p-2 font-bold'>Todo Time</td>
                                <td className='border border-neutral-300 p-2 font-bold'>Firebase Id</td>
                                <td className='border border-neutral-300 p-2 font-bold'>Action</td>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {fruitArray ? (
                                fruitArray.map((item, index) => (
                                    <tr key={index} className='border border-neutral-300'>
                                        <td className='border border-neutral-300 p-2'> {item.fruitName} </td>
                                        <td className='border border-neutral-300 p-2'> {item.fruiteDef} </td>
                                        <td className='border border-neutral-300 p-2'> {item.fruitId} </td>
                                        <td className='border border-neutral-300 p-2'>
                                            <button className={`bg-indigo-100 m-2 p-2 px-6 text-zinc-700 rounded-full`} onClick={() => handleEdit(item.fruitId)}>Edit</button>
                                            <button className={`bg-indigo-100  m-2 p-2 px-6 text-zinc-700 rounded-full`} onClick={() => deleteFruit(item.fruitId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <li>No fruits available</li>
                            )}
                        </tbody>

                    </table>
                </div>

            </div> </div>

    )
}

export default CrudReal;