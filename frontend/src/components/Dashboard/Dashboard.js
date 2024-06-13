import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Box } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import CourseList from './CourseList';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await api.get('/api/enrollment/users/:userId/enrollments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchEnrolledCourses();
  }, [token]);

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <CourseList courses={courses} />
      </Box>
    </Container>
  );
};

export default Dashboard;
