// AdminRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function AdminRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    return <Navigate to="/login" />;
  }

  if (!currentUser.isAdmin) {
    // Если пользователь не администратор, перенаправляем на главную страницу или выдаем сообщение об ошибке
    return <Navigate to="/" />;
  }

  // Если пользователь администратор, разрешаем доступ
  return children;
}

export default AdminRoute;