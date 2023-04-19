import React, { useState } from 'react';
import { getAuth } from "firebase/auth";


const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const auth = getAuth();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const user = auth.currentUser;
      const cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
      await user.reauthenticateWithCredential(cred);
      await user.updatePassword(newPassword);
      setMessage('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;