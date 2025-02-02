import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
 // Importing Navbar.css for styling


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/career-paths">CS Career Paths</Link></li>
        <li><Link to="/career-quiz">Career Quiz</Link></li>
        <li><Link to="/skill-roadmap">Skill Roadmap</Link></li>
        <li><Link to="/mentorship">Mentorship & Networking</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
