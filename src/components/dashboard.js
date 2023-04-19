import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import ChangePassword from './ChangePassword';
import Profile from './Profile';
import Search from './Search';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      

      <div className="component-container">

        <Profile />
      </div>

      <div className="component-container">

        <Search />
      </div>

      <div className="component-container">

        <ChangePassword />
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="component-container">

        <p>Created by Brian using React, Firebase, and Tailwind CSS</p>
      </div>
    </div>
  );
};

export default Dashboard;