import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';

function Header() {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Логотип или название сайта */}
        <Link className="navbar-brand" to="/">
          Research-портал
        </Link>

        {/* Приветствие для пользователя */}
        {currentUser && (
          <span className="navbar-text me-auto">
            Салют, <strong>{currentUser.name}</strong>, как процесс?
          </span>
        )}

        {/* Кнопка переключения навигации на мобильных устройствах */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Переключить навигацию"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Пункты меню */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {currentUser ? (
              <>
                {/* Ссылка на страницу исследований */}
                <li className="nav-item">
                  <Link className="nav-link" to="/research">
                    Исследования
                  </Link>
                </li>

                {/* Если пользователь администратор, показываем ссылку на админку */}
                {currentUser.isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Админка
                    </Link>
                  </li>
                )}

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
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Вход
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Регистрация
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;