  import React from 'react'
  import { Link ,useNavigate} from 'react-router-dom'
  import logo from '../../Assets/images/project-management.png'
  import {useEffect, useState} from 'react';
 import auth from '../../config/Firebase';
 import { signOut } from 'firebase/auth';

  const Navbar = () => {
    const navigate =useNavigate();
    const [log, setlog] =useState(false);

    useEffect(()=>{
      auth.onAuthStateChanged(function(user){
        if(user){
          setlog(true);
          console.log("user logged in")
        }else{
          setlog(false);
          console.log("user logged out")
        }
      })
    },[])

    function logout(){

      signOut(auth).then(()=>{
        localStorage.clear(); 
        console.log("logged out")
        navigate('/')
      }
    )

    }


    return (
      <div className='py-5 flex justify-between items-center sticky top-0 z-10 bg-white'>
          <img className='w-[50px] sm:hidden' src={logo} alt='logo'/>
          <h2 className='hidden font-bold text-xl md:2xl sm:block'>Student Project App</h2>
          
          <div className='flex items-center'>
              <Link className='px-2' to={"/"}>Home</Link>
              <Link className='px-2' to={"/dashboard"}>DashBoard</Link>
              <Link className='pl-2 pr-5' to={"/profile"}>Profile</Link>

              
    {
      log? <button onClick={logout}className='px-5 py-[10px] rounded-md font-bold text-center shadow-md text-white bg-gradient-to-l from-red-400 to-red-700 hover:from-blue-700 hover:to-blue-400 hidden md:block'>Logout
      </button>  : <button onClick={()=>{navigate('/login')}} className='px-5 py-[10px] rounded-md font-bold text-center shadow-md text-white bg-gradient-to-l from-pink-400 to-red-700 hover:from-blue-700 hover:to-red-400 hidden md:block'>Login
      </button>
    }

                      
          </div>
      </div>
    )
  }

  export default Navbar