import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Box, MenuItem } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';

const CourseForm = ({ courseId }) => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('lecture');
  const [contentData, setContentData] = useState('');
  const [order, setOrder] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = { title, description, contentType, contentData, order };
      await api.post(`/api/content/courses/${courseId}/content`, content, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Clear form or show success message
    } catch (error) {
      console.error('Error adding course content:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Add Content</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            label="Content Type"
            select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="lecture">Lecture</MenuItem>
            <MenuItem value="quiz">Quiz</MenuItem>
            <MenuItem value="assignment">Assignment</MenuItem>
            <MenuItem value="resource">Resource</MenuItem>
          </TextField>
          <TextField
            label="Content Data"
            value={contentData}
            onChange={(e) => setContentData(e.target.value)}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            label="Order"
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Content
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CourseForm;
