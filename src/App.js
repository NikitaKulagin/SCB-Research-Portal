import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Research from './Research';
import AdminDashboard from './AdminDashboard';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import NotFound from './NotFound';
import initialResearchData from './initData';
import ResearchDetail from './ResearchDetail';

import './App.css';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли текущий пользователь в Local Storage
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    // Проверяем, есть ли данные исследований в Local Storage
    const researchData = JSON.parse(localStorage.getItem('researchData'));
    if (!researchData) {
      // Если нет, инициализируем их начальными данными
      localStorage.setItem('researchData', JSON.stringify(initialResearchData));
    }
  }, []);


  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login isAuthenticated={isAuthenticated} />} />
        <Route path="/register" element={<Register isAuthenticated={isAuthenticated} />} />
        <Route
          path="/research/:id"
          element={
            <PrivateRoute>
              <ResearchDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/research"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Research isAuthenticated={isAuthenticated} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
