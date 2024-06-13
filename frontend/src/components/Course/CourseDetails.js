import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';

const CourseDetails = () => {
  const { courseId } = useParams();
  const { token } = useContext(AuthContext);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get(`/api/content/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId, token]);

  if (!course) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>{course.title}</Typography>
        <Typography variant="body1">{course.description}</Typography>
        {/* Display course content here */}
      </Box>
    </Container>
  );
};

export default CourseDetails;
