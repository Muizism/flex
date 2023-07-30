import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import StudentLoginPage from './pages/studentLogin';





function App() {
  return (

    <Routes>
    <Route path="/" element={<StudentLoginPage />} />

    <Route />
  </Routes>
 
  );
}

export default App;
