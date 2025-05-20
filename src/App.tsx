import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Furniture from './pages/Furniture';
import Textures from './pages/Textures';
import Reviews from './pages/Reviews';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'furniture':
        return <Furniture />;
      case 'textures':
        return <Textures />;
      case 'reviews':
        return <Reviews />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
}

export default App;