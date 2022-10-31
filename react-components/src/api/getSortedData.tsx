import { IArtWorkData } from '../pages/HomePage/HomePage';

export interface IGetData {
  artWorksList: Array<IArtWorkData>;
  totalPages: string;
  currentPage: string;
}

export interface DateSorting {
  sort: [{ date_start: string }];
}

export interface TitleSorting {
  mappings: {
    properties: {
      title: {
        type: string;
        fields: {
          keyword: {
            type: string;
          };
        };
      };
    };
  };
  sort: [{ 'title.keyword': string }];
}

export interface AuthorSorting {
  mappings: {
    properties: {
      artist_title: {
        type: string;
        fields: {
          keyword: {
            type: string;
          };
        };
      };
    };
  };
  sort: [{ 'artist_title.keyword': string }];
}

export const getSortedData = async (
  value: string,
  limit: string,
  obj: DateSorting | TitleSorting | AuthorSorting | unknown,
  page: string
): Promise<IGetData | undefined> => {
  console.log('value=', value);
  console.log('limit=', limit);
  console.log('obj=', obj);
  console.log('page=', page);
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${value}&query[term][is_public_domain]=true&fields=id,title,artist_title,date_display,artwork_type_title,dimensions,artist_display,image_id&page=${page}&limit=${limit}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }
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

    const totalPages = respJson.pagination.total_pages;
    const currentPage = respJson.pagination.current_page;

    return {
      artWorksList: artWorksList,
      totalPages: totalPages,
      currentPage: currentPage,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(err.message);

    throw new Error(`Error: ${err.message}`);
  }
};
