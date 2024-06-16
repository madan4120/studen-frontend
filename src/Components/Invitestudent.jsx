import React, { useState, useEffect }  from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import auth from '../config/Firebase';

const Invitestudent = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate =useNavigate();

    useEffect(()=>{
        auth.onAuthStateChanged(function(user){
          if(user){
            console.log("user logged in")
          }else{
            navigate('/');
          }
        })
      },[])

    const sendInvitation = () => {
          
        if (!email) {
            setError('Email is required');
            return;
        }


        axios.post('http://localhost:4000/api/invite-student', { email })
          .then(() => {
            alert('Invitation sent successfully!');
            navigate("/dashboard");
          })
          .catch((error) => {
            console.error('Error sending invitation:', error);
            alert('Failed to send invitation. Please try again.');
          });
      };
      
    

  return (
    <div className="h-[80vh] flex justify-center items-center">
    <div className='bg-gray-200 p-10 rounded-lg flex flex-col gap-2'> 
      <h2 className="text-2xl font-semibold">Invite Student</h2>
      <label htmlFor='email' className="block text-blue-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
         
  
      <div className='flex gap-2 mt-4'> 
      <button
        className="w-[120px] px-4 py-2 rounded-md bg-red-500 text-white font-bold hover:bg-red-600" onClick={sendInvitation}>
        Send Invite
      </button>
      <button
        className="w-[100px] px-4 py-2 rounded-md bg-gray-500 text-white font-bold hover:bg-blue-600"
        onClick={()=>{navigate('/dashboard')}}>
        Cancel
      </button>
     </div>
      {error && <p className="text-red-500">{error}</p>}

    </div>
  </div>
  
  )
}

export default Invitestudent
