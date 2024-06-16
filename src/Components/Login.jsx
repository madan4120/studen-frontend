import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';


function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ err, seterr ] =useState("");

    useEffect(()=>{
        auth.onAuthStateChanged(function(user){
          if(user){
            navigate('/');
          }else{
            console.log("user logged out");
          }
          
        })
      },[])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseId = userCredential.user.uid;

            const response = await axios.post('http://localhost:4000/api/login', { email, firebaseId });

            if (response.status === 200) {
                const userProfile = response.data;
                // console.log(userProfile)
                navigate('/'); 

                // Store user profile data in local storage to pass it to the profile page
                localStorage.setItem('userProfile', JSON.stringify(userProfile));
            } else {
                throw new Error('Failed to fetch user profile data');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            seterr('Invalid email or password. Please try again.');
        }
    };
  

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-950 to-gray-300 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-md w-[75%]">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Login</h2>
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
                <div htmlFor='password' className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>

                <p className='text-red-600 cursor-pointer my-2'>{err}</p>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/signup")}>New user? Register here</p>
                <button className='px-5 py-[10px] rounded-md font-bold text-center shadow-md text-white bg-gradient-to-l from-gray-400 to-gray-800 hover:from-red-700 hover:to-red-400'>Login</button>
            </form>
        </div>
    );
}

export default Login;
