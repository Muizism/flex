import './App.css';
import Login from './components/student/login';
import HomePage from './components/student/HomePage';
import AcademicLogin from './components/academic/login';
import TimeTable from './components/academic/TimeTable';
import ExamSchedule from './components/academic/ExamSchedule';
import RegisterCourse from './components/academic/RegisterCourse';
import DropCourse from './components/academic/DropCourse';
import ChangeSection from './components/academic/ChangeSection';
import AcademicHome from './components/academic/AcademicHome';
import Exam from './components/student/Exam';
import Timetable from './components/student/TimeTable';
import Fee from './components/student/Fee';
import Feedback from './components/student/Feedback';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AcademicProvider } from './components/academic/academicHomeContext';

function App() {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<Login />} />
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
