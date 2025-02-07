import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './components/Layout';

import './ResearchDetail.css';

function ResearchDetail() {
    
    const { id } = useParams(); // Получаем параметр id из URL
    // const navigate = useNavigate(); // Удаляем или комментируем эту строку
    const researchId = parseInt(id, 10);
  
    const [showPdf, setShowPdf] = useState(false); // Добавляем состояние
  
    // Загружаем данные исследований из Local Storage
    const researchData = JSON.parse(localStorage.getItem('researchData')) || [];
  
    // Находим исследование с соответствующим id
    const research = researchData.find((item) => item.id === researchId);
  
    if (!research) {
      return (
        <Layout>
          <h1>Исследование не найдено</h1>
        </Layout>
      );
    }
  
    return (
      <Layout>
        <h1>{research.title}</h1>
        <p><strong>Тема:</strong> {research.domain}</p>
        <p><strong>Периодичность:</strong> {research.periodicity}</p>
        <p><strong>Дата:</strong> {research.date}</p>
        <button
        className="btn btn-primary"
        onClick={() => setShowPdf(!showPdf)} // Переключаем состояние
        >
            {showPdf ? 'Скрыть PDF файл' : 'Открыть PDF файл'}
        </button>

        {/* Условно отображаем iframe с PDF-файлом */}
        {showPdf && (
        <iframe
            src={research.pdfUrl}
            width="100%"
            height="600px"
            title={research.title}
            style={{ border: 'none', marginTop: '20px' }}
            onError={() => alert('Не удалось загрузить PDF-файл.')}
        ></iframe>
)}
      </Layout>
    );
  }
  
  export default ResearchDetail;