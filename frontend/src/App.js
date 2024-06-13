import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import CourseList from './components/Course/CourseList';
import ProtectedRoute from './components/ProtectedRoute';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<CourseList />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute element={<Dashboard />} />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute element={<Profile />} />
              }
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
