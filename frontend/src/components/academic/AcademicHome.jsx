import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {
  const { academicId } = useParams();
  const [academicInfo, setAcademicInfo] = useState(null);

  useEffect(() => {
    const fetchAcademicInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/academics/academics/${academicId}`);
        setAcademicInfo(response.data);
      } catch (error) {
        console.error('Error fetching academic info:', error);
      }
    };

    fetchAcademicInfo();
  }, [academicId, setAcademicInfo]); // Include setAcademicInfo in the dependency array

  return (
    <div className="container mt-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        {/* ...navbar code... */}
      </nav>
      <h2 className="text-center">Welcome to the Home Page</h2>
      <div className="card mt-3">
        <div className="card-body">
          {academicInfo ? (
            <div>
              <p className="card-text">
                <strong>Name:</strong> {academicInfo.first_name} {academicInfo.last_name}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {academicInfo.email}
              </p>
            </div>
          ) : (
            <p>Loading academic information...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
