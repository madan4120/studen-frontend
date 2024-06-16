import React from 'react'
import { MdWavingHand } from "react-icons/md";
import mainimage from '../Assets/images/HOME.jpg'
import Footer from './common/Footer'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  
  const navigate =useNavigate();

  return (
    <div> 

     <div className='flex items-center justify-center gap-10'>
     <div className='w-full sm:w-1/2 flex-col justify-center'>
        <div className='flex items-center gap-3'>
        <h2 className='text-3xl md:text-6xl font-bold pb-2 text-pink-700'>Hi Students</h2>
        <i className="text-3xl md:text-6xl text-yellow-500"><MdWavingHand /></i>
        </div>
     
     <p className='font-medium py-2 text-xl text-blue-700'>This is the place where you can look all your project details and deadlines.  📅 #studentlife #projectmanagement
    </p>
    <button onClick={()=>{navigate('/dashboard')}} className='mt-2 px-5 py-[10px] rounded-md font-bold text-center shadow-md text-white bg-gradient-to-l from-green-400 to-orange-700 hover:from-orange-700 hover:to-pink-400 block'>View Projects</button>
     <img className='w-96 mt-5 block sm:hidden' src={mainimage} alt="mainimage" />
     </div>
     <div className='justify-center hidden sm:block'>
        
        <img src={mainimage} className=' w-60 md:w-96 lg:w-[500px] lg:h-[500px]' alt="mainimage" />

     </div>
     </div>

{/* ----------Key Features section----------------- */}

     <div className="bg-pink py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-orange-200 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Project Management</h3>
              <p className="text-blue-700">Organize and track your projects efficiently with our intuitive project management system.</p>
            </div>

            <div className="bg-orange-200 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-blue-700">Visualize goals and stay motivated with our progress tracking tools.</p>
            </div>
            <div className="bg-orange-200 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-blue-700">Collaborate seamlessly on team projects with real-time updates and shared boards.</p>
            </div>
          </div>
        </div>
      </div>

{/* ------FAQ section--------- */}

<div className="bg-blue-200 py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-6 text-orange-700">Frequently Asked Questions</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2">How do I get started with the project management system?</h3>
        <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod nisi nec lectus consectetur tristique.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2">Can I invite team members to collaborate on my projects?</h3>
        <p className="text-gray-700">Yes! You can easily invite team members by entering their email addresses and assigning roles.</p>
      </div>
  
    </div>
  </div>
</div>


<Footer/>

    </div>
  )
}

export default Home