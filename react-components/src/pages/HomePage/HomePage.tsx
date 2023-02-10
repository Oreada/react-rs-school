import React, { useEffect } from 'react';
import { ArtWorksList } from '../../components/ArtWorksList/ArtWorksList';
import { Pagination } from '../../components/Pagination/Pagination';
import { ResultsPerPage } from '../../components/ResultsPerPage/ResultsPerPage';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Sorting } from '../../components/Sorting/Sorting';
import { useAppSelector } from '../../store/hook';
import { store } from '../../store';
import { getData, setPageCurrent } from '../../store/homePageArtworksSlice';
// import { screensaver } from '../../data/screensaver';

export interface IArtWorkData {
  id: number;
  image_id: string;
  artist_display: string;
  artist_title: string;
  artwork_type_title: string;
  date_display: string;
  dimensions: string;
  title: string;
}

export function HomePage() {
  const artworksList = useAppSelector((state) => state.homePageArtworks.list); //! так достаём данные из redux store
  console.log('HomePage', artworksList);

  useEffect(() => {
    if (!artworksList.length) {
      console.log('Starting artworks!!!');
      store.dispatch(
        getData({
          value: '',
          limit: '',
          obj: {},
          page: '1',
        })
      );
    }
  }, []);

  return (
    <div className="container">
      <main className="home-page" data-testid="home-page">
        <SearchBar />
        <div className="home-page-selects">
          <Sorting />
          <ResultsPerPage />
        </div>
        <div className="home-page-list">
          <ArtWorksList data={artworksList} />
        </div>
        <div className="home-page-pagination">
          <Pagination />
        </div>
      </main>
    </div>
  );
}
