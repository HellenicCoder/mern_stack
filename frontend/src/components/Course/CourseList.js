import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import api from '../../services/api';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/api/content/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Courses</Typography>
        <List>
          {courses.map((course) => (
            <ListItem key={course._id}>
              <ListItemText
                primary={course.title}
                secondary={course.description}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default CourseList;
