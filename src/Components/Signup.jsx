import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../config/Firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        auth.onAuthStateChanged(function(user){
          if(user){
            navigate('/');
          }else{
            console.log("user logged out");
          }
          
        })
      },[])
  

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if the passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        // Check with the backend if the user is allowed to sign up
        axios.post('http://localhost:4000/api/checkSignup', { email })
            .then((backendResponse) => {
                if (backendResponse.data.allowed) {
                
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const firebaseId = userCredential.user.uid;
                            signOut(auth);
    
                            // Signup user with backend
                            axios.post('http://localhost:4000/api/signup', {
                                userName,
                                age,
                                phoneNumber,
                                email,
                                firebaseId
                            })
                                .then((response) => {
                                    if (response.status === 201) {
                                        navigate('/login');
                                    } else {
                                        throw new Error('Failed to signup');
                                    }
                                })
                                .catch((error) => {
                                    console.error('Error signing up:', error);
                                    setError('Error signing up! Please try again.');
                                });
                        })
                        .catch((error) => {
                            console.error('Error creating user:', error);
                            setError('Error creating user! Please try again.');
                        });
                } else {
                    // Display error message if the backend denies signup
                    setError(backendResponse.data.message);
                }
            })
            .catch((error) => {
                console.error('Error checking signup:', error);
                setError('Error checking signup! Please try again.');
            });
    };
    
    
    

    return (
        <div className="flex justify-center items-center bg-gradient-to-r from-gray-950 to-gray-300 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="m-10 p-10 bg-white rounded-lg shadow-md w-[75%]">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Signup</h2>

                <div className="mb-4">
                    <label htmlFor='userName' className="block text-gray-700">User Name:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='age' className="block text-gray-700">Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='phoneNumber' className="block text-gray-700">Phone Number:</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor='email' className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='password' className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='confirmPassword' className="block text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
               
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/login")}> Already have an account? Login here</p>
                <button className='px-5 py-[10px] rounded-md font-bold text-center shadow-md text-white bg-gradient-to-l from-gray-400 to-gray-900 hover:from-red-700 hover:to-red-400'>Signup</button>
            </form>
        </div>
    );
}

export default Signup;
