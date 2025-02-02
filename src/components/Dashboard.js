import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for programmatic navigation
import './styles/Dashboard.css';  // Custom styles for the dashboard

const Dashboard = () => {
  const navigate = useNavigate();  // Hook for navigation

  // Handler for navigation
  const navigateToPage = (page) => {
    navigate(`/${page}`);  // Navigate to the corresponding page
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>CS Compass</h2>
        </div>
        <div className="sidebar-links">
          <button className="sidebar-btn" onClick={() => navigateToPage('career-paths')}>
            Career Paths
          </button>
          <button className="sidebar-btn" onClick={() => navigateToPage('career-quiz')}>
            Career Quiz
          </button>
          <button className="sidebar-btn" onClick={() => navigateToPage('skill-roadmap')}>
            Skill Roadmap
          </button>
          <button className="sidebar-btn" onClick={() => navigateToPage('mentorship')}>
            Mentorship & Networking
          </button>
        </div>
      </div>

      <div className="main-content">
        <h1>Welcome to Your Dashboard</h1>
        <div className="content-grid">
          {/* Image buttons for each page */}
          <div className="content-card" onClick={() => navigateToPage('career-paths')}>
            <img src="/images/career-pathways.png" alt="Explore Career Paths" className="content-card-img" />
            <p>Explore Career Paths</p>
          </div>
          <div className="content-card" onClick={() => navigateToPage('career-quiz')}>
            <img src="/images/quiz.png" alt="Take A Career Quiz" className="content-card-img" />
            <p>Take A Career Quiz</p>
          </div>
          <div className="content-card" onClick={() => navigateToPage('skill-roadmap')}>
            <img src="/images/skills.png" alt="My Skills Roadmap" className="content-card-img" />
            <p>My Skills Roadmap</p>
          </div>
          <div className="content-card" onClick={() => navigateToPage('mentorship')}>
            <img src="/images/mentorship.png" alt="Connect With My Mentors" className="content-card-img" />
            <p>Meet My Mentorship & Networking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
