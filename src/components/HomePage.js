import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css'; // Importing the CSS file for HomePage

const HomePage = () => {
  const [user, setUser] = useState(null);  // Track logged in user
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);  // Set user to the logged-in user
      console.log(user);
      navigate('/dashboard');  // Redirect to the Dashboard after login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-page">
      <div className="content">
        <img src="/images/logo1.png" alt="CS Compass Logo" className="logo" />
        <h1 className="headline">Find Your Purpose In Computer Science</h1>
        
        {!user ? (
          <button className="sign-in-btn" onClick={handleLogin}>Sign in with Google</button>
        ) : (
          <div>
            <p>Welcome, {user.displayName}</p>
            <button className="sign-in-btn" onClick={() => auth.signOut()}>Sign out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;