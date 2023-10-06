import './App.css'

import { Route,Routes } from 'react-router-dom';

import CourseList from './Course/CourseList';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/Contact';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login'
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/about" element={<AboutUs/>}></Route> 
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/courses" element={<CourseList/>}></Route>
      <Route path="/contact" element={<ContactUs/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
