import React, { useState } from 'react';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import withAdmin from "../WithAdmin";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus('Creating...');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setStatus('Success');
    } catch (error) {
      setError(error.message);
      setStatus('Failed');
    }
  };

  return (
    <div>
      <h1>Admin Add Account</h1>
      {status && <p>Account creation status: {status}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default withAdmin(Register);
