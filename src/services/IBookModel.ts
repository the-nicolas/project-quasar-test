export interface ICovers {
  large: string;
  medium: string;
  small: string;
}

export interface IEbooks {
  availability: string;
  checkedout: boolean;
  previewUrl: string;
  // dummies for bad names
  readonly preview_url?: string;
}

export interface IIdentifiers {
  goodreads: string[];
  isbn_10: string[];
  isbn_13: string[];
  openlibrary: string[];
  amazon: string[];
  google: string[];
  lccn: string[];
  libraryanything: string[];
}

export interface IAuthor {
  name: string;
  url: string;
}

export interface ISubjects {
  name: string;
  url: string;
}

export interface IExcerpts {
  comment: string;
  text: string;
}

export interface IPublishPlaces {
  name: string;
}

export interface ILinks {
  title: string;
  url: string;
}

export interface IBookModel {
  key?: string;
  valid?: boolean;
  url?: string;
  title?: string;
  notes?: string;
  authors?: IAuthor[];
  excerpts?: IExcerpts[];
  numberPages?: number;
  publishDate?: string;
  publishPlaces?: IPublishPlaces[];
  publishers?: IPublishPlaces[];
  cover?: ICovers;
  ebooks?: IEbooks[];
  identifiers?: IIdentifiers;
  subjects?: ISubjects[];
  links?: ILinks[];
  byStatement?: string;
  // dummies for bad names
  readonly publish_date?: string;
  readonly publish_places?: IPublishPlaces[];
  readonly number_of_pages?: number;
  readonly by_statement?: string;
}
