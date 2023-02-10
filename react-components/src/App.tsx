import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { HomePage } from './pages/HomePage/HomePage';
import { FormsPage } from './pages/FormsPage/FormsPage';
import { Details } from './components/Details/Details';
import { useAppSelector } from './store/hook';

function App() {
  const artworksList = useAppSelector((state) => state.homePageArtworks.list); //! так достаём данные из redux store
  // console.log('artworksList', artworksList);
  const idDetails = useAppSelector((state) => state.idDetails.idDetails); //! так достаём данные из redux store
  // console.log('idDetails', idDetails);

  // console.log('filtration', artworksList.filter((item) => item.id === idDetails)[0]);
  const artWorkWithDetails = artworksList.filter((item) => item.id === idDetails)[0]; //! нахожу нужную карточку из стейта по ID

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/artwork/:name"
          element={idDetails === 0 ? <Navigate to="/" /> : <Details data={artWorkWithDetails} />}
        />
      </Routes>
    </div>
  );
}

export default App;
