import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
        setFormData({
          username: response.data.user.username,
          email: response.data.user.email,
          password: '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setMessage('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Profile</Typography>
        {message && <Typography>{message}</Typography>}
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        ) : (
          <div>
            <Typography>Username: {user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Button variant="contained" onClick={() => setEditMode(true)}>Edit Profile</Button>
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
