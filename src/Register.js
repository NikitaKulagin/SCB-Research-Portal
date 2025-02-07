import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    // Ваша существующая валидация...
    if (name.trim() === '') {
      validationErrors.name = 'Пожалуйста, введите ваше имя.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Пожалуйста, введите корректный email.';
    }

    if (password.length < 6) {
      validationErrors.password = 'Пароль должен содержать не менее 6 символов.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Преобразуем email в нижний регистр
    const emailLower = email.toLowerCase();

    // Получаем существующих пользователей из Local Storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Проверяем, нет ли уже пользователя с таким email
    const isUserExists = existingUsers.some(
      (user) => user.email.toLowerCase() === emailLower
    );

    if (isUserExists) {
      setErrors({ email: 'Пользователь с таким email уже зарегистрирован.' });
      return;
    }

    // Создаём объект нового пользователя
    const newUser = {
      name,
      email: emailLower, // Сохраняем email в нижнем регистре
      password,
      isAdmin: false, // Обычный пользователь
    };

    // Добавляем нового пользователя в массив существующих пользователей
    existingUsers.push(newUser);

    // Сохраняем обновлённый массив пользователей в Local Storage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Очистим поля формы и ошибки после успешной регистрации
    setName('');
    setEmail('');
    setPassword('');
    setErrors({});

    // Дополнительно можно перенаправить пользователя или показать сообщение об успешной регистрации
    alert('Спасибо за регистрацию! С вами скоро свяжутся менеджеры.');

    navigate('/login');
  };

  return (
    <Layout>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Имя
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email адрес
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Зарегистрироваться
        </button>
      </form>
    </Layout>
  );
}

export default Register;