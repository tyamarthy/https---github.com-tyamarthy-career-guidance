import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import CareerPaths from './components/CareerPaths';
import CareerQuiz from './components/CareerQuiz';
import SkillRoadmap from './components/SkillRoadmap';
import Mentorship from './components/Mentorship';
import Dashboard from './components/Dashboard'; // Import Dashboard for the signed-in page
import Navbar from './components/Navbar';  // New Navbar component

function App() {
  const [user, setUser] = useState(null); // Track if the user is signed in

  return (
    <Router>
      <Routes>
        {/* Conditional Rendering: Only show Navbar if user is signed in */}
        <Route path="/" element={<HomePage setUser={setUser} />} />
        
        {user && <Navbar />} {/* Show Navbar only if user is signed in */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/career-paths" element={<CareerPaths />} />
        <Route path="/career-quiz" element={<CareerQuiz />} />
        <Route path="/skill-roadmap" element={<SkillRoadmap />} />
        <Route path="/mentorship" element={<Mentorship />} />
      </Routes>
    </Router>
  );
}

export default App;
