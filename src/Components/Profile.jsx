import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../config/Firebase';

function Profile() {
    const [userProfile, setUserProfile] = useState(null);
    const navigate =useNavigate();
    // Fetch user profile data from local storage on component mount
    useEffect(() => {

        auth.onAuthStateChanged(function(user){
            if(user){
              console.log("user logged in")
              const storedUserProfile = localStorage.getItem('userProfile');

              if (storedUserProfile) {
                  const parsedUserProfile = JSON.parse(storedUserProfile);
                  setUserProfile(parsedUserProfile);
              }
            }else{
              navigate('/')
              console.log("user logged out")
            }
          })
      
      
    }, []);


    return (
        <div className="profile-container flex justify-center items-center bg-gradient-to-r from-gray-950 to-gray-500 rounded-lg shadow-lg">
            <div className="w-full sm:w-[75%] m-5 p-10 bg-white rounded-lg shadow-md lg:w-[50%]">
                <h2 className='text-3xl mb-2 font-medium'>Profile</h2>
                {userProfile ? (
                    <div className="text-xl flex flex-col justify-center">
                        <p><strong>User Name:</strong> {userProfile.userName}</p>
                        <p><strong>Age:</strong> {userProfile.age}</p>
                        <p><strong>Phone Number:</strong> {userProfile.phoneNumber}</p>
                        <p><strong>Email:</strong> {userProfile.email}</p>
                    <div className='flex gap-3 mt-3'> 
                        <Link to={`/edit-profile/${userProfile._id}`}>
                            <button className='px-5 py-[10px] rounded-md font-bold text-center w-[150px] text-white bg-gradient-to-l from-red-700 to-red-400'>
                                Edit Profile
                            </button>
                        </Link>
                        <button className="w-[90px] px-4 py-[10px] rounded-md bg-gray-500 text-white font-bold hover:bg-gray-600" onClick={()=>{navigate('/')}}>
                           Home 
                        </button>
                     </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
