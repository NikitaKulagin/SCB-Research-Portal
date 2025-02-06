import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';

function Login({ isAuthenticated }) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
      
        // Получаем список пользователей из Local Storage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      
        // Ищем пользователя с введённым email и паролем
        const user = existingUsers.find(
          (user) => user.email === email && user.password === password
        );
      
        if (user) {
          // Вызываем функцию `login` из контекста
          login(user);
      
          // Очищаем поля и ошибки
          setEmail('');
          setPassword('');
          setError('');
      
          // Перенаправляем пользователя на страницу исследований
          navigate('/research');
        } else {
          // Если пользователь не найден или пароль неверный
          setError('Неверный email или пароль.');
        }
      };

    return (
    <Layout isAuthenticated={isAuthenticated}>
        <h1>Вход</h1>
        <form onSubmit={handleSubmit} noValidate>
        {error && (
            <div className="alert alert-danger" role="alert">
            {error}
            </div>
        )}
        <div className="mb-3">
            <label htmlFor="email" className="form-label">
            Email адрес
            </label>
            <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">
            Пароль
            </label>
            <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <button type="submit" className="btn btn-primary">
            Войти
        </button>
        </form>
    </Layout>
    );
}

export default Login;