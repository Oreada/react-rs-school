import { IArtWorkData } from '../pages/HomePage/HomePage';

export const getData = async (): Promise<Array<IArtWorkData> | undefined> => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=landscape&query[term][is_public_domain]=true&fields=id,title,artist_title,date_display,image_id&page=1&limit=9`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }
    const respJson = await response.json();
    if (!respJson.hasOwnProperty('data')) {
      throw new Error(`Incorrect content format`);
    }
    const artWorksList = respJson.data;
    console.log('artWorksList', artWorksList);

    return artWorksList;
  } catch (e: unknown) {
    const err = e as Error;
    console.log(err.message);

    throw new Error(`Error: ${err.message}`);
  }
};
