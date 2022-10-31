import { IArtWorkData } from '../pages/HomePage/HomePage';

export const getDetails = async (idArtWork: number): Promise<IArtWorkData | undefined> => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/${idArtWork}?query[term][is_public_domain]=true&fields=id,title,artist_title,date_display,artwork_type_title,dimensions,artist_display,image_id&page=1&limit=20`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }
    const respJson = await response.json();
    if (!respJson.hasOwnProperty('data')) {
      throw new Error(`Incorrect content format`);
    }
    const artWork = respJson.data;
    console.log('artWork getDetails', artWork);

    return artWork;
  } catch (e: unknown) {
    const err = e as Error;
    console.log(err.message);

    throw new Error(`Error: ${err.message}`);
  }
};
