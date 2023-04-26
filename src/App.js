import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Admin';
import Home from './components/home';
import Login from './components/Login';
import Profile from './components/Profile';
import Search from './components/Search';
import ChangePassword from './components/ChangePassword';
import CreateAcc from './components/CreateAcc';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/create-account" element={<CreateAcc />} />
        <Route path="/Admin" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
};

export default App;