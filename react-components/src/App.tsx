import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { HomePage, IArtWorkData } from './pages/HomePage/HomePage';
import { FormsPage } from './pages/FormsPage/FormsPage';
import { FormContext, HomePageContext } from './context';
import { SortingActionOption } from './reducer';
import { AuthorSorting, DateSorting, TitleSorting } from './api/getSortedData';
import { ResultsPerPageOption } from './components/ResultsPerPage/ResultsPerPage';
import { ICard } from './components/Card/Card';

function App() {
  const [homePage, setHomePage] = useState<Array<IArtWorkData>>([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortingValue, setSortingValue] = useState<'' | SortingActionOption>('');
  const [objForSorting, setObjForSorting] = useState<
    DateSorting | TitleSorting | AuthorSorting | unknown
  >({});
  const [limitValue, setLimitValue] = useState<'' | ResultsPerPageOption>('');
  const [pageCurrent, setPageCurrent] = useState('1');
  const [pageTotal, setPageTotal] = useState('1');

  const [cardsList, setCardsList] = useState<Array<ICard>>([]);

  const addCard = (card: ICard) => {
    setCardsList([card, ...cardsList]);
  };

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
        pageCurrent: pageCurrent,
        setPageCurrent: setPageCurrent,
        pageTotal: pageTotal,
        setPageTotal: setPageTotal,
      }}
    >
      <FormContext.Provider value={{ addCard, cardsList, setCardsList }}>
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
      </FormContext.Provider>
    </HomePageContext.Provider>
  );
}

export default App;
