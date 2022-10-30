import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { HomePage, IArtWorkData } from './pages/HomePage/HomePage';
import { FormsPage } from './pages/FormsPage/FormsPage';
import { HomePageContext } from './context';
import { SortingActionOption } from './reducer';
import { AuthorSorting, DateSorting, TitleSorting } from './api/getSortedData';
import { ResultsPerPageOption } from './components/ResultsPerPage/ResultsPerPage';

function App() {
  const [homePage, setHomePage] = useState<Array<IArtWorkData>>([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortingValue, setSortingValue] = useState<'' | SortingActionOption>('');
  const [objForSorting, setObjForSorting] = useState<
    DateSorting | TitleSorting | AuthorSorting | unknown
  >({});
  const [limitValue, setLimitValue] = useState<'' | ResultsPerPageOption>('');

  return (
    <HomePageContext.Provider
      value={{
        store: homePage,
        setStore: setHomePage,
        searchValue: searchValue,
        setSearchValue: setSearchValue,
        sortingValue: sortingValue,
        setSortingValue: setSortingValue,
        objForSorting: objForSorting,
        setObjForSorting: setObjForSorting,
        limitValue: limitValue,
        setLimitValue: setLimitValue,
      }}
    >
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
