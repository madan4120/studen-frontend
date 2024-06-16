import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import auth from '../config/Firebase';

function EditProfile() {

    const [userName, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const {id} =useParams();
    const navigate =useNavigate();

    useEffect(() => {

        auth.onAuthStateChanged(function(user){
            if(user){

              console.log("user logged in");
              const storedUserProfile = localStorage.getItem('userProfile');
            
              if (storedUserProfile) {
                  const parsedUserProfile = JSON.parse(storedUserProfile);
                  setUserName(parsedUserProfile.userName);
                  setAge(parsedUserProfile.age);
                  setPhoneNumber(parsedUserProfile.phoneNumber);
              }
            }else{
              navigate('/')
              console.log("user logged out")
            }
          })    
    }, []);

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.put(`http://localhost:4000/api/edit-profile/${id}`, {
                userName,
                age,
                phoneNumber
            });

            console.log('User data updated:', response.data);

            localStorage.setItem('userProfile', JSON.stringify(response.data));
            navigate('/');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-orange-950 to-green-300 rounded-lg">
            <form onSubmit={handleSubmit} className="flex flex-col p-10 bg-white rounded-lg shadow-md w-[75%]">
                <h2 className='text-2xl font-bold text-blue-800'>Edit Profile</h2>
                <label htmlFor="userName">User Name:</label>
                <input className='border p-2 mb-4' type="text" id="userName" name="userName" value={userName} onChange={handleUserNameChange} required />
                
                <label htmlFor="age">Age:</label>
                <input className='border p-2 mb-4'  type="number" id="age" name="age" value={age} onChange={handleAgeChange} required />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input className='border p-2 mb-4'  type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} required />
             <div className='flex gap-3'> 
             <button className=' px-5 py-[10px] rounded-md font-bold text-center w-[150px] shadow-md text-white bg-gradient-to-l from-pink-700 to-blue-400'>
                    Save Changes
             </button>
                <button className="w-[90px] px-4 py-[10px] rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600" onClick={()=>{navigate('/profile')}}>
                    Cancel
                 </button>
             </div>

            </form>
        </div>
    );
}

export default EditProfile;
