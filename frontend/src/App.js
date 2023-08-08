import './App.css';
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


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AcademicProvider } from './components/academic/academicHomeContext';

function App() {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<Login />} />
  <Route path='/navbar' element={<Navbar />} />
  <Route path="/academic-login" element={<AcademicLogin />} />
  <Route path="/home/:studentId" element={<HomePage />} />
  <Route path="/academic-home/:academicId" element={<AcademicHome />} />
  <Route path="/show-exam" element={<Exam />} />
  <Route path="/show-table" element={<Timetable />} />
  <Route path="/payment" element={<Fee />} />
  <Route path="/feedback" element={<Feedback />} />
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
