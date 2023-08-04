
import './App.css';
import Login from './components/student/login';
import HomePage from './components/student/HomePage';
import AcademicLogin from './components/academic/login';
import TimeTable from './components/academic/TimeTable';
import ExamSchedule from './components/academic/ExamSchedule';
import  RegisterCourse  from './components/academic/RegisterCourse';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/academic-login" element={< AcademicLogin />} />
        <Route path="/timetable" element={< TimeTable />} />
        <Route path="/exam-schedule" element={< ExamSchedule />} />
        <Route path="/register-course" element={< RegisterCourse />} />
        <Route path="/home" element={< HomePage />} />
      </Routes>
    </Router>
   
  );
}

export default App;
