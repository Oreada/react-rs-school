import React, { useState, useEffect } from 'react';
import { ArtWorksList } from '../../components/ArtWorksList/ArtWorksList';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { getData } from '../../api/getData';
import { Sorting } from '../../components/Sorting/Sorting';

export interface IArtWorkData {
  id: number;
  image_id: string;
  artist_title: string;
  date_display: string;
  title: string;
}

interface HomePageState {
  dataList: Array<IArtWorkData>;
  loading: boolean;
  errorMessage: string;
}

export function HomePage() {
  const [homePageState, sethomePageState] = useState<HomePageState>({
    dataList: [],
    loading: true,
    errorMessage: '',
  });

  const changeHomePageState = (
    newList: Array<IArtWorkData>,
    newLoading: boolean,
    newErrorMessage: string
  ) => {
    sethomePageState({
      dataList: newList,
      loading: newLoading,
      errorMessage: newErrorMessage,
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const artWorksList = await getData();
        sethomePageState({
          dataList: artWorksList as Array<IArtWorkData>,
          loading: false,
          errorMessage: '',
        });
      } catch (e: unknown) {
        const err = e as Error;
        sethomePageState({
          dataList: [],
          loading: false,
          errorMessage: err.message,
        });
      }
    }
    fetchData();
  }, []); // someId Or [] if effect doesn't need props or state

  return (
    <main className="home-page" data-testid="home-page">
      <SearchBar changeHomePageState={changeHomePageState} />
      <Sorting />
      <ArtWorksList
        data={homePageState.dataList}
        loading={homePageState.loading}
        errorMessage={homePageState.errorMessage}
      />
    </main>
  );
}
