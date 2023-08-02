
import './App.css';
import Login from '../src/components/student/login';
import Home from '../src/components/student/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
  
  );
}

export default App;
