import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig"; // firebase imp
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./styles/Dashboard.css"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const navigateToPage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>CS Compass</h2>
          {user && <p className="user-name">Welcome, {user.displayName || "User"}!</p>}
        </div>
        <div className="sidebar-links">
          <button className="sidebar-btn" onClick={() => navigateToPage("career-paths")}>
            Career Paths
          </button>
          <button className="sidebar-btn" onClick={() => navigateToPage("career-quiz")}>
            Career Quiz
          </button>
          <button className="sidebar-btn" onClick={() => navigateToPage("skill-roadmap")}>
            Skill Roadmap
          </button>
          <button className="sidebar-btn" onClick={() => navigateToPage("mentorship")}>
            Mentorship & Networking
          </button>
        </div>
        {/* Logout Button at Bottom */}
        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      <div className="main-content">
        <h1>Welcome to Your Dashboard</h1>
        <div className="content-grid">
          <div className="content-card" onClick={() => navigateToPage("career-paths")}>
            <img src="/images/career-pathways.png" alt="Explore Career Paths" className="content-card-img" />
            <p>Explore Career Paths</p>
          </div>
          <div className="content-card" onClick={() => navigateToPage("career-quiz")}>
            <img src="/images/quiz.png" alt="Take A Career Quiz" className="content-card-img" />
            <p>My Career Quizzes</p>
          </div>
          <div className="content-card" onClick={() => navigateToPage("skill-roadmap")}>
            <img src="/images/skills.png" alt="My Skills Roadmap" className="content-card-img" />
            <p>My Skills Roadmap</p>
          </div>
          <div className="content-card" onClick={() => navigateToPage("mentorship")}>
            <img src="/images/mentorship.png" alt="Connect With My Mentors" className="content-card-img" />
            <p>Meet My Mentors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
