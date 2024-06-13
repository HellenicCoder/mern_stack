import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';

const EditProfile = () => {
  const { token } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { username, email, password };
      await api.put('/api/auth/profile', updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Clear form or show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfile;
