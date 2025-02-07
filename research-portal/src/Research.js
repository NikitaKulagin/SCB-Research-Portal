import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout';
import './Research.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Research() {

  const [researchData, setResearchData] = useState([]);

  const [selectedDomain, setSelectedDomain] = useState('Все темы');
  const [selectedPeriodicity, setSelectedPeriodicity] = useState('Любая периодичность');

  const [domains, setDomains] = useState([]);
  const [periodicities, setPeriodicities] = useState([]);

  useEffect(() => {
    // Загружаем данные исследований из Local Storage
    const data = JSON.parse(localStorage.getItem('researchData')) || [];
    setResearchData(data);

    // Извлекаем уникальные темы и периодичности
    setDomains(['Все темы', ...getUniqueValues(data, 'domain')]);
    setPeriodicities(['Любая периодичность', ...getUniqueValues(data, 'periodicity')]);
  }, []);

  function getUniqueValues(data, key) {
    return [...new Set(data.map((item) => item[key]))];
  }

  const filteredResearchData = researchData.filter((research) => {
    const domainMatch =
      selectedDomain === 'Все темы' || research.domain === selectedDomain;
    const periodicityMatch =
      selectedPeriodicity === 'Любая периодичность' ||
      research.periodicity === selectedPeriodicity;
    return domainMatch && periodicityMatch;
  });

  return (
    <Layout>
      <h1>Список исследований</h1>

      <div className="filters">
        <select
          className="form-select"
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          {domains.map((domain, index) => (
            <option key={index} value={domain}>
              {domain}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          value={selectedPeriodicity}
          onChange={(e) => setSelectedPeriodicity(e.target.value)}
        >
          {periodicities.map((periodicity, index) => (
            <option key={index} value={periodicity}>
              {periodicity}
            </option>
          ))}
        </select>

        {/* Кнопка сброса фильтров */}
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectedDomain('Все темы');
            setSelectedPeriodicity('Любая периодичность');
          }}
        >
          Сбросить фильтры
        </button>
      </div>

      {filteredResearchData.length === 0 ? (
        <p>Нет исследований, соответствующих выбранным фильтрам.</p>
      ) : (
        <div className="research-grid">
          {filteredResearchData.map((research) => (
            <div key={research.id} className="research-item">
              <Link to={`/research/${research.id}`}>
                <img src={research.thumbnailUrl} alt={research.title} />
              </Link>
              <div className="info">
                <h5>{research.title}</h5>
                <p>{research.date}</p>
                <div className="tags">
                  <span className="tag">{research.domain}</span>
                  <span className="tag">{research.periodicity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Research;