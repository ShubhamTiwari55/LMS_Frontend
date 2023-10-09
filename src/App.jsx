import './App.css'

import { Route,Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import CourseDesc from './Course/CourseDesc';
import CourseList from './Course/CourseList';
import CreateCourse from './Course/CreateCourse';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/Contact';
import AddLecture from './Pages/Dashboard/AddLecture';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';
import DisplayLectures from './Pages/Dashboard/DisplayLectures';
import Denied from './Pages/Denied';
import EditProfile from './Pages/EditProfile';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login'
import NotFound from './Pages/NotFound';
import Checkout from './Pages/payments/Checkout';
import CheckoutFailure from './Pages/payments/CheckoutFailure';
import CheckoutSuccess from './Pages/payments/CheckoutSuccess';
import Profile from './Pages/Profile';
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
      <Route path="/course/description" element={<CourseDesc/>}></Route>
      <Route path="/contact" element={<ContactUs/>}></Route>
      <Route path="/denied" element={<Denied/>}></Route>
      
      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
      <Route path="/course/create" element={<CreateCourse/>}></Route>
      <Route path="/course/addlecture" element={<AddLecture/>}></Route>
      <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]}/>}>
      <Route path="/user/profile" element={<Profile/>}></Route>
      <Route path="/editprofile" element={<EditProfile/>}></Route>
      <Route path="/checkout" element={<Checkout/>}></Route>
      <Route path="/checkout/success" element={<CheckoutSuccess/>}></Route>
      <Route path="/checkout/fail" element={<CheckoutFailure/>}></Route>
      <Route path="/course/displaylectures" element={<DisplayLectures/>}></Route>
      </Route>
      
      <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
