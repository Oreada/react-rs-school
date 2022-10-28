import React, { useState } from 'react';
import { ArtWorksList } from '../../components/ArtWorksList/ArtWorksList';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Sorting } from '../../components/Sorting/Sorting';
import { useHomePageContext } from '../../context';
// import { screensaver } from '../../data/screensaver';

export interface IArtWorkData {
  id: number;
  image_id: string;
  artist_title: string;
  date_display: string;
  title: string;
}

interface HomePageState {
  loading: boolean;
  errorMessage: string;
}

export function HomePage() {
  const { store, setStore } = useHomePageContext();

  const [homePageState, sethomePageState] = useState<HomePageState>({
    loading: false,
    errorMessage: '',
  });

  const changeHomePageState = (
    newList: Array<IArtWorkData>,
    newLoading: boolean,
    newErrorMessage: string
  ) => {
    sethomePageState({
      loading: newLoading,
      errorMessage: newErrorMessage,
    });

    setStore(newList);
  };

  return (
    <main className="home-page" data-testid="home-page">
      <SearchBar changeHomePageState={changeHomePageState} />
      <Sorting changeHomePageState={changeHomePageState} />
      <ArtWorksList
        data={store}
        loading={homePageState.loading}
        errorMessage={homePageState.errorMessage}
      />
    </main>
  );
}
