import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Login from './pages/student/login';
import HomePage from './pages/student/HomePage';
import AcademicLogin from './pages/academic/login';
import TimeTable from './pages/academic/TimeTable';
import ExamSchedule from './pages/academic/ExamSchedule';
import RegisterCourse from './pages/academic/RegisterCourse';
import DropCourse from './pages/academic/DropCourse';
import ChangeSection from './pages/academic/ChangeSection';
import AcademicHome from './pages/academic/AcademicHome';
import Exam from './pages/student/Exam';
import Timetable from './pages/student/TimeTable';
import Fee from './pages/student/Fee';
import Feedback from './pages/student/Feedback';
import Navbar from './components/navbar';
import WithdrawCourse from './pages/student/CourseWithdrawal';
import Nav from './components/academic_nav';
import Attendance from './pages/student/Checkattendance';
import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AcademicProvider } from './components/academic/academicHomeContext';

function App() {  
    const [login,setlogin]=useState(localStorage.getItem('token')?true:false);
    // const [Alogin,setAlogin]=useState(localStorage.getItem('Atoken')?true:false);
    // localStorage.removeItem('Atoken');
    // localStorage.removeItem('AuserId');

    useEffect(() => { 
        setlogin(localStorage.getItem('token')?true:false);
        // setAlogin(localStorage.getItem('Atoken')?true:false);
      
      },[])


  return (
    <Router>
     <Routes>
  <Route path="/" element={<Login login={login}/>} />
  <Route path='/navbar' element={<Navbar />} />
  <Route path="/academic-login" element={<AcademicLogin />} />
  <Route path="/home/:studentId" element={<HomePage />} />
  <Route path="/academic-home/:academicId" element={<AcademicHome />} />
  <Route path="/show-exam" element={<Exam />} />
  <Route path="/show-table" element={<Timetable />} />
  <Route path="/payment" element={<Fee />} />
  <Route path="/feedback" element={<Feedback />} />
  <Route path="/withdraw-course" element={<WithdrawCourse />} />
  <Route path="/academic-nav" element={<Nav />} />
  <Route path="/check-attendance" element={<Attendance />} />
    {/* <AcademicProvider> */}
      <Route path="/drop-course" element={<DropCourse />} />
      <Route path="/change-section" element={<ChangeSection />} />
      <Route path="/timetable" element={<TimeTable />} />
      <Route path="/exam-schedule" element={<ExamSchedule />} />
      <Route path="/register-course" element={<RegisterCourse />} />
    {/* </AcademicProvider> */}
  
</Routes>
    </Router>
  );
}

export default App;
