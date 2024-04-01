import React, {useState, useEffect} from 'react'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {  Navigate } from 'react-router-dom';
import Login from './Login/login'
import Register from './Register/register'
import Home from './component/home'
import Crud from './firestore/crud'
import CrudReal from './realtimedb/crudReal'
import { auth } from './firebase';
import Resetpswd from './Login/passwordReset'
import LoginPhone from './Login/loginPhone'
import UploadImg from './storage/UploadImg'



function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log('user :>> ', user);
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }
  , []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
    <div>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />}  />
        <Route path='/login' element={user ? <Home /> : <Login />}  />
        <Route path='/register' element={ <Register />}/>
        <Route path='/home' element={user ? <Home /> : <Navigate to="/" />}/>
        <Route path='/crud' element={user ? <Crud /> : <Navigate to="/" />} />
        <Route path='/crudreal' element={user ? <CrudReal /> : <Navigate to="/" />} />
        <Route path='/pswdreset' element={<Resetpswd/>} />
        <Route path='/loginphone' element={<LoginPhone/>} />
        <Route path='/upload' element={<UploadImg/>} />


      
      </Routes>
    </div>
    </Router>
  )
}

export default App
