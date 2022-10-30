import { AuthorSorting, DateSorting, TitleSorting } from './api/getSortedData';

// An enum with all the types of actions to use in our reducer
export enum SortingActionOption {
  titleAscending = 'title-ascending',
  titleDescending = 'title-descending',
  authorAscending = 'author-ascending',
  authorDescending = 'author-descending',
  dateAscending = 'date-ascending',
  dateDescending = 'date-descending',
}

// An interface for our state
export interface SortingState {
  objForSorting: DateSorting | TitleSorting | AuthorSorting | unknown;
}

// An interface for our actions
export interface SortingAction {
  type: SortingActionOption;
  // payload: number;
}

export const dateAsc = {
  sort: [{ date_start: 'asc' }],
};

export const dateDesc = {
  sort: [{ date_start: 'desc' }],
};

export const titleAsc = {
  mappings: {
    properties: {
      title: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
    },
  },
  sort: [{ 'title.keyword': 'asc' }],
};

export const titleDesc = {
  mappings: {
    properties: {
      title: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
    },
  },
  sort: [{ 'title.keyword': 'desc' }],
};

export const authorAsc = {
  mappings: {
    properties: {
      artist_title: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
    },
  },
  sort: [{ 'artist_title.keyword': 'asc' }],
};

export const authorDesc = {
  mappings: {
    properties: {
      artist_title: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
    },
  },
  sort: [{ 'artist_title.keyword': 'desc' }],
};

export function sortingReducer(state: SortingState, action: SortingAction) {
  switch (action.type) {
    case SortingActionOption.titleAscending:
      return { objForSorting: titleAsc };
    case SortingActionOption.titleDescending:
      return { objForSorting: titleDesc };
    case SortingActionOption.authorAscending:
      return { objForSorting: authorAsc };
    case SortingActionOption.authorDescending:
      return { objForSorting: authorDesc };
    case SortingActionOption.dateAscending:
      return { objForSorting: dateAsc };
    case SortingActionOption.dateDescending:
      return { objForSorting: dateDesc };
    default:
      return state;
  }
}
