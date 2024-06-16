
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB3_jYl0oNnJPcW39uygk2j4zH8RGoBDO8",
  authDomain: "student-project-manager-35a5f.firebaseapp.com",
  projectId: "student-project-manager-35a5f",
  storageBucket: "student-project-manager-35a5f.appspot.com",
  messagingSenderId: "987537069075",
  appId: "1:987537069075:web:5f161fd961252324cf1be6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);


export default auth;