import React, { useState, useEffect } from 'react';
import Footer from './common/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import auth from '../config/Firebase';

const DashBoard = () => {

  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [log, setLog] = useState(false);

  useEffect(() => {

      auth.onAuthStateChanged(function(user) {
      if (user) {
      
        const firebaseUserId = user.uid; 
        
        axios.get(`http://localhost:4000/api/user/role/${firebaseUserId}`)
          .then((res) => {
            const userRole = res.data.role;
            if (userRole === 'teacher') {
              console.log('User is a teacher');
              setLog(true);
            } else {
              console.log('User is a student');
              setLog(false);
            }
          })
          .catch(() => {
            console.log('Error fetching user role');
          });

      } else {
      
        console.log('User logged out');
        setLog(false);
        navigate('/');
      }
    });
  
  
   
    axios.get('http://localhost:4000/api/projects')
      .then((res) => {
        // console.log(res.data);
        setProjects(res.data);
      })
      .catch(() => {
        console.log('Error fetching data');
      });
  }, []);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Calculate the deadline date (30 days from today)
    const deadline = new Date(today);
    deadline.setDate(deadline.getDate() + 30);
    const deadlineDate = deadline.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    axios.post("http://localhost:4000/api/projects/create", { projectTitle, projectDescription, date, deadline: deadlineDate }).then((res) => {
      // console.log(res.data);
      setProjects([...projects, res.data]);
      closePopup();
    })
      .catch((error) => {
        console.error('Error adding project:', error);
      });

    setProjectTitle('');
    setProjectDescription('');
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleDeleteProject = (id) => {
    axios.delete(`http://localhost:4000/api/projects/delete/${id}`).then(function (res) {
      console.log(res);
      window.location.reload();
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Function to filter projects based on search query
  const filteredProjects = projects.filter(project => {
    return project.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className='mb-2'>
      <h2 className="text-center text-5xl font-bold mb-10 text-blue-700 mt-24">
       see projects 📚
      </h2>
      <div className='flex justify-center items-center gap-2'>
        <input
          type="text" 
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:border-black"
        />
        
      </div>

      <div className='mt-10'>

      {
        log? <div className='flex gap-4'>
        <button
          className='px-5 py-[10px] rounded-md font-bold text-center shadow-md text-white bg-gradient-to-l from-yellow-600 to-pink-900 hover:from-red-700 hover:to-red-400' onClick={openPopup}>
          Add Project
        </button> 
  
        <button
          className='px-5 py-[10px] rounded-md font-bold text-center shadow-md text-white bg-gradient-to-l from-yellow-600 to-pink-900 hover:from-red-700 hover:to-red-400' onClick={()=>{navigate("/invitestudent")}}>
          Invite Student
        </button>
  
        </div> : null
      }

        <div className="project-container grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4 mt-5">
          {filteredProjects.map((project) => (
            <div key={project._id} className="blog-post mb-8 p-6 bg-orange-200 shadow-lg rounded-lg relative" >
              
              {
                log?
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600 absolute top-3 right-3" onClick={() => navigate(`/editproject/${project._id}`)}>
                Edit
              </button> : null
              }
              

              <h3 onClick={() => handleProjectClick(project)} className="text-sm project-title font-semibold sm:text-2xl text-gray-800 mb-3 cursor-pointer hover:text-red-700">
                <span className='text-sm sm:text-lg font-normal'>Project Title:</span> {project.projectTitle}
              </h3>

              <p className="text-sm project-startDate text-red-800 sm:text-lg mb-4 font-normal"><span className='text-sm sm:text-lg font-normal text-gray-800'>Start Date:</span> {project.date}</p>

              <p className="text-sm project-deadline text-red-800 sm:text-lg mb-4 font-normal"><span className='text-sm sm:text-lg font-normal text-gray-800'>Deadline:</span> {project.deadline}</p>
             
             {
              log? <AiOutlineDelete className='border-solid text-2xl cursor-pointer text-red-500' onClick={() => { handleDeleteProject(project._id) }} /> : null
             }
             
            </div>
          ))}
        </div>

      </div>

      {/*--------to view Selected project-----------*/}
      {selectedProject && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto scrollbar-none" >
            <h3 className="text-xl font-semibold mb-2"><span className='text-lg font-normal'>Project Title:</span> {selectedProject.projectTitle}</h3>
            <p className="text-gray-800 mb-4"><span className='text-lg font-normal'>Description:</span> {selectedProject.projectDescription}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/*------ Popup for adding project-------- */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-xl w-full">
            <h3 className="text-xl font-bold mb-4">Add Project</h3>
            <input
              type="text"
              placeholder="Project Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:border-black"
            />
            <textarea
              placeholder="Project Description"
              value={projectDescription}
              rows="8"
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:border-black"
            />
            <button
              className="px-4 py-2 rounded-md bg-red-500 text-white font-bold hover:bg-red-600"
              onClick={handleAddProject}
            >
              Add
            </button>
            <button
              className="px-4 py-2 ml-2 rounded-md bg-gray-300 text-gray-800 font-bold hover:bg-gray-400"
              onClick={closePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DashBoard;
