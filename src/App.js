import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import CareerPaths from './components/CareerPaths';
import CareerQuiz from './components/CareerQuiz';
import SkillRoadmap from './components/SkillRoadmap';
import Mentorship from './components/Mentorship';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar'; 

function App() {
  const [user, setUser] = useState(null); 

  return (
    <Router>
      <Routes>
        {/* Conditional Rendering:  show Navbar if user is signed in */}
        <Route path="/" element={<HomePage setUser={setUser} />} />
        
        {user && <Navbar />} {/* nav only if user is signed in */}

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
