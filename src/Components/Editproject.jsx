import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Editproject = () => {
    const [projectDescription, setProjectDescription] = useState('');
    const {id} =useParams();
    const navigate =useNavigate();

    useEffect(()=>{
      axios.get(`http://localhost:4000/api/projects/${id}`).then(function(res){
            // console.log(res.data)
            setProjectDescription(res.data.projectDescription)

      }).catch(function(error){
        console.log(error)
      })

    },[id])

 const handleEditproject =()=>{

    axios.put(`http://localhost:4000/api/projects/edit/${id}`,{projectDescription})
    .then((res)=>{
        console.log(res);
        navigate('/dashboard')

    }).catch((err)=>console.log(err));

 }


  return (
<div className="h-[80vh] flex justify-center items-center">
  <div className='bg-gray-200 p-10 rounded-lg flex flex-col gap-5'> 
    <h2 className="text-2xl font-semibold">Update Project</h2>
    <textarea
      placeholder="Project Description"
      value={projectDescription}
      rows="8"
      onChange={(e) => setProjectDescription(e.target.value)}
      className="w-[300px] sm:w-[400px] md:w-[600px] border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:border-black"
    ></textarea>

    <div className='flex gap-2'> 
    <button
      className="w-[100px] px-4 py-2 rounded-md bg-red-500 text-white font-bold hover:bg-red-600"
      onClick={handleEditproject}
    >
      Update
    </button>
    <button
      className="w-[100px] px-4 py-2 rounded-md bg-gray-500 text-white font-bold hover:bg-gray-600"
      onClick={()=>{navigate('/dashboard')}}
    >
      Cancel
    </button>

    </div>

    

  </div>
</div>

  )
}

export default Editproject