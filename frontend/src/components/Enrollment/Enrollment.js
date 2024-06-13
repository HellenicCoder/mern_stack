import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';

const Enrollment = () => {
  const { token } = useContext(AuthContext);
  const [courseId, setCourseId] = useState('');
  const [enrollmentMessage, setEnrollmentMessage] = useState('');

  const handleEnroll = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/enrollment/enroll', { courseId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrollmentMessage('Enrolled successfully');
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setEnrollmentMessage('Error enrolling in course');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Enroll in a Course</Typography>
        <form onSubmit={handleEnroll}>
          <TextField
            label="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enroll
          </Button>
        </form>
        {enrollmentMessage && <Typography>{enrollmentMessage}</Typography>}
      </Box>
    </Container>
  );
};

export default Enrollment;
