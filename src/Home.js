import React from 'react';
import Layout from './components/Layout';

function Home({ isAuthenticated }) {
  return (
    <Layout isAuthenticated={isAuthenticated}>
      <h1>Добро пожаловать на Research-портал</h1>
    </Layout>
  );
}

export default Home;