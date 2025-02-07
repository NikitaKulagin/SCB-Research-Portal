// AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Проверяем, есть ли текущий пользователь в Local Storage
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }

    // Проверяем, есть ли администратор в Local Storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const adminExists = existingUsers.some((user) => user.email.toLowerCase() === 'kulaginna@sovcombank.ru');

    if (!adminExists) {
      // Создаем администратора
      const adminUser = {
        name: 'Nikita',
        email: 'kulaginna@sovcombank.ru',
        password: '111111',
        isAdmin: true,
      };
      existingUsers.push(adminUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
    }
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;