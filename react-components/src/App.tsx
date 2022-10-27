import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { HomePage, IArtWorkData } from './pages/HomePage/HomePage';
import { FormsPage } from './pages/FormsPage/FormsPage';
import { HomePageContext } from './context';

function App() {
  const [homePage, setHomePage] = useState<Array<IArtWorkData>>([]);

  return (
    <HomePageContext.Provider value={{ store: homePage, setStore: setHomePage }}>
      <div className="container">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </HomePageContext.Provider>
  );
}

export default App;
