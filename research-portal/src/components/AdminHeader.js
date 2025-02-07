import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';

function AdminHeader() {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Логотип или название сайта */}
        <Link className="navbar-brand" to="/admin">
          Admin Panel
        </Link>

        {/* Приветствие для пользователя */}
        {currentUser && (
          <span className="navbar-text me-auto ms-3">
            Салют, <strong>{currentUser.name}</strong>, как процесс?
          </span>
        )}

        {/* Кнопка переключения навигации на мобильных устройствах */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbarNav"
          aria-controls="adminNavbarNav"
          aria-expanded="false"
          aria-label="Переключить навигацию"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Пункты меню */}
        <div className="collapse navbar-collapse" id="adminNavbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Ссылка на страницу исследований */}
            <li className="nav-item">
              <Link className="nav-link" to="/research">
                Исследования
              </Link>
            </li>

            {/* Кнопка выхода */}
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={handleLogout}
                style={{ textDecoration: 'none' }}
              >
                Выход
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;