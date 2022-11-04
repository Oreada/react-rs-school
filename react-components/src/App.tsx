import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { HomePage } from './pages/HomePage/HomePage';
import { FormsPage } from './pages/FormsPage/FormsPage';
import { HomePageContext } from './context';
// import { SortingActionOption } from './reducer';
import { AuthorSorting, DateSorting, TitleSorting } from './api/getSortedData';
import { ResultsPerPageOption } from './components/ResultsPerPage/ResultsPerPage';
import { Details } from './components/Details/Details';
import { useAppSelector } from './store/hook';

function App() {
  const artworksList = useAppSelector((state) => state.homePageArtworks.list); //! так достаём данные из redux store
  console.log(artworksList);

  // const [searchValue, setSearchValue] = useState('');
  // const [sortingValue, setSortingValue] = useState<'' | SortingActionOption>('');
  const [objForSorting, setObjForSorting] = useState<
    DateSorting | TitleSorting | AuthorSorting | unknown
  >({});
  const [limitValue, setLimitValue] = useState<'' | ResultsPerPageOption>('');
  const [pageCurrent, setPageCurrent] = useState('1');
  const [pageTotal, setPageTotal] = useState('1');

  const [idDetails, setIdDetails] = useState(0);

  console.log('filtration', artworksList.filter((item) => item.id === idDetails)[0]);
  const artWorkWithDetails = artworksList.filter((item) => item.id === idDetails)[0]; //! нахожу нужную карточку из стейта по ID

  console.log('idDetails', idDetails);

  return (
    <HomePageContext.Provider
      value={{
        // searchValue: searchValue,
        // setSearchValue: setSearchValue,
        // sortingValue: sortingValue,
        // setSortingValue: setSortingValue,
        objForSorting: objForSorting,
        setObjForSorting: setObjForSorting,
        limitValue: limitValue,
        setLimitValue: setLimitValue,
        pageCurrent: pageCurrent,
        setPageCurrent: setPageCurrent,
        pageTotal: pageTotal,
        setPageTotal: setPageTotal,
        idDetails: idDetails,
        setIdDetails: setIdDetails,
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
          {/* <Route path="/artwork/:name" element={<Details data={artWorkWithDetails} />} /> */}
          <Route
            path="/artwork/:name"
            element={idDetails === 0 ? <Navigate to="/" /> : <Details data={artWorkWithDetails} />}
          />
        </Routes>
      </div>
    </HomePageContext.Provider>
  );
}

export default App;
