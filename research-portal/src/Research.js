import React from 'react';
import Layout from './components/Layout';

function Research({ isAuthenticated }) {
  return (
    <Layout isAuthenticated={isAuthenticated}>
      <h1>Список исследований</h1>
    </Layout>
  );
}

export default Research;