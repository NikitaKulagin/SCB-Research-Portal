import React, { useState, useEffect } from 'react';
import AdminLayout from './components/AdminLayout';

function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('');
  const [periodicity, setPeriodicity] = useState('');
  const [date, setDate] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [message, setMessage] = useState(''); // Состояние для уведомлений

  const [researchData, setResearchData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('researchData')) || [];
    setResearchData(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newResearch = {
      id: Date.now(),
      title,
      domain,
      periodicity,
      date,
      pdfUrl,
      thumbnailUrl,
    };

    const updatedData = [...researchData, newResearch];
    setResearchData(updatedData);
    localStorage.setItem('researchData', JSON.stringify(updatedData));

    // Очистка полей формы
    setTitle('');
    setDomain('');
    setPeriodicity('');
    setDate('');
    setPdfUrl('');
    setThumbnailUrl('');

    // Устанавливаем сообщение об успешном добавлении
    setMessage('Исследование успешно добавлено.');
  };

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это исследование?')) {
      const updatedData = researchData.filter((item) => item.id !== id);
      setResearchData(updatedData);
      localStorage.setItem('researchData', JSON.stringify(updatedData));

      // Устанавливаем сообщение об успешном удалении
      setMessage('Исследование успешно удалено.');
    }
  };

  return (
    <AdminLayout>
      <h1>Панель администратора</h1>

      {message && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setMessage('')}
          ></button>
        </div>
      )}

      <h2>Добавить новое исследование</h2>
      <form onSubmit={handleSubmit}>
        {/* Поля формы для ввода данных исследования */}
        {/* Поле "Название" */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Название
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        {/* Поле "Тема" */}
        <div className="mb-3">
          <label htmlFor="domain" className="form-label">
            Тема
          </label>
          <input
            type="text"
            className="form-control"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </div>
        {/* Поле "Периодичность" */}
        <div className="mb-3">
          <label htmlFor="periodicity" className="form-label">
            Периодичность
          </label>
          <select
            className="form-select"
            id="periodicity"
            value={periodicity}
            onChange={(e) => setPeriodicity(e.target.value)}
            required
          >
            <option value="">Выберите периодичность</option>
            <option value="Ежедневное">Ежедневное</option>
            <option value="Еженедельное">Еженедельное</option>
            <option value="Ежемесячное">Ежемесячное</option>
            <option value="Ежеквартальное">Ежеквартальное</option>
            <option value="One-off">One-off</option>
          </select>
        </div>
        {/* Поле "Дата" */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Дата
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {/* Поле "Ссылка на PDF" */}
        <div className="mb-3">
          <label htmlFor="pdfUrl" className="form-label">
            Ссылка на PDF
          </label>
          <input
            type="text"
            className="form-control"
            id="pdfUrl"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            required
          />
        </div>
        {/* Поле "Ссылка на миниатюру" */}
        <div className="mb-3">
          <label htmlFor="thumbnailUrl" className="form-label">
            Ссылка на миниатюру
          </label>
          <input
            type="text"
            className="form-control"
            id="thumbnailUrl"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Добавить исследование
        </button>
      </form>

      <h2 className="mt-5">Существующие исследования</h2>
      {/* Отображение списка существующих исследований */}
      <table className="table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Тема</th>
            <th>Периодичность</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {researchData.map((research) => (
            <tr key={research.id}>
              <td>{research.title}</td>
              <td>{research.domain}</td>
              <td>{research.periodicity}</td>
              <td>{research.date}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(research.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default AdminDashboard;