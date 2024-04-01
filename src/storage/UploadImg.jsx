import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { dbFire, storage } from '../firebase'
// import { storage } from "../storage"
import { v4 } from 'uuid'
import { getDownloadURL, getMetadata, listAll, ref, uploadBytes, uploadBytesResumable, deleteObject } from 'firebase/storage'
import { addDoc, getDocs, collection } from 'firebase/firestore'
import Header from '../component/header'
import '../storage/uploadimg.scss'

const UploadImg = () => {
    const [img, setImg] = useState('')
    const [txt, setTxt] = useState('')
    const [data, setData] = useState([])
    const [files, setFiles] = useState([]);

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const listResult = await listAll(ref(storage, 'TestImgs/'));
                const imageUrls = await Promise.all(listResult.items.map(async (item) => {
                    const downloadURL = await getDownloadURL(item);
                    return { url: downloadURL, name: item.name, size: item.size };
                }));
                setImages(imageUrls);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
    }, []);


    const handleDelete = async (imageName) => {
        const confirmed = window.confirm('Are you sure you want to delete?');
        if (!confirmed) return;
        try {
            await deleteObject(ref(storage, `TestImgs/${imageName}`));
            setImages(images.filter(image => image.name !== imageName));
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        const fileName = file.name;
        const imgs = ref(storage, `TestImgs/${fileName}`)
        uploadBytes(imgs, file).then(data => {
            getDownloadURL(data.ref).then(val => {
                setImages(prevImages => [...prevImages, { url: val, name: fileName }])
                alert("Uploaded the file")
                e.target.value = null;
                setImg(val)
            })
        })
    }

    // const handleDownload = async (imageName) => {
    //     try {
    //         window.open(`http://localhost:3000/download/${imageName}`, '_blank');
    //     } catch (error) {
    //         console.error("Error downloading file:", error);
    //     }
    // };


    const handleDownload = async (imageUrl, imageName) => {
        try {

            // const imageBlob = await fetch(imageUrl).then((response) => response.arrayBuffer())
            // .then((buffer) => new Blob([buffer], {type: 'image/jpeg'}));

            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {

                // const blob = await fetch(imageUrl).then((response) => xhr.response.arrayBuffer()).thenthen((buffer) => new Blob([buffer], {type: 'image/jpeg'}));
                const blob = xhr.response;
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = imageName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
            xhr.open('GET', imageUrl);
            xhr.send();

            // const response = await fetch(imageUrl);
            // const blob = await response.blob();
            // const url = URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = imageUrl.split('/').pop();
            // document.body.appendChild(a);
            // a.click();
            // document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <div>
           <div className='flex justify-end px-32 py-7 sm:px-0'>
                <Link to='/home'><button
                className='border border-blue-600 hover:rounded-lg hover:border hover:border-blue-500 p-2 hover:bg-blue-500 hover:text-white rounded-full mx-2'
                >
                    Back To Home
                </button>
                </Link>

            </div>
            <div className='flex flex-col justify-center items-center m-2'>


                <div>
                    <h5 className='text-blue-800 font-bold mt-4 text-lg sm:text-center'>"Select a file to upload it to Firebase Storage. Download it anytime, or delete it with a click of a button!"</h5>    {/* <Header /> */}
                </div>
                <div className='flex justify-center flex-col items-center m-10'>

                    <label className='bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-500'>
                        <input type='file' onChange={(e) => handleUpload(e)} className='hidden' />
                        Choose an File
                    </label>
                </div>
                <div className=' m-4 mx-80 sm:mx-10 fadeInUp animated animatedFadeInUp lg:grid lg:grid-cols-4 gap-4 '>

                    {images.map((image, index) => (
                        <div key={index} className='m-5 p-2 shadow-xl bg-white w-[210px] h-[250px]'>
                            <img src={image.url} alt={`Image ${index}`} className='h-[200px] w-[210px] object-contain' />

                            <div className='flex justify-between items-center m-2 '>
                                <button onClick={() => handleDelete(image.name)} ><svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg></button>
                                <button onClick={() => handleDownload(image.url, image.name)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UploadImg 
