import React from 'react'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Navbar from './Components/common/Navbar';
import Home from './Components/Home';
import DashBoard from './Components/DashBoard';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Editproject from './Components/Editproject';
import Profile from './Components/Profile';
import EditProfile from './Components/Editprofile';
import Invitestudent from './Components/Invitestudent';

const App = () => {
  return (
    <div className="px-10 bg-white border rounded-md">
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/dashboard" element={<DashBoard/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/editproject/:id' element={<Editproject/>}></Route>
      <Route path='/edit-profile/:id' element={<EditProfile/>}></Route>
      <Route path='/invitestudent' element={<Invitestudent/>}></Route>

     
    </Routes>

    </BrowserRouter>
   </div>
  )
}

export default App