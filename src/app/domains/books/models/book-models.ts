import { Review } from '../../reviews/models/review-models';

export interface Book {
  id: number;
  isbn: string;
  author: string;
  coverUrl: string;
  title: string;
  description: string;
  category: Category;
  copies: BookCopy[];
  reviews: Review[];
  waitingList: WaitingList[];
}

export interface BookCopy {
  id: number;
  available: boolean;
  state: BookState;
  book: Book;
}

export interface WaitingList {
  id: number;
  dateAdded: Date;
  book: Book;
}

export enum BookCategory {
  ACTION = 'Action',
  ADVENTURE = 'Adventure',
  ANIMATION = 'Animation',
  COMEDY = 'Comedy',
  CRIME = 'Crime',
  DOCUMENTARY = 'Documentary',
  DRAMA = 'Drama',
  MUSICAL = 'Musical',
  ROMANCE = 'Romance',
  SCI_FI = 'Sci-Fi',
  THRILLER = 'Thriller',
  WAR = 'War',
}

export const BookCategoryOptionLabels: Record<BookCategory, string> = {
  [BookCategory.ACTION]: 'Action',
  [BookCategory.ADVENTURE]: 'Aventure',
  [BookCategory.ANIMATION]: 'Animation',
  [BookCategory.COMEDY]: 'Comédie',
  [BookCategory.CRIME]: 'Crime',
  [BookCategory.DOCUMENTARY]: 'Documentaire',
  [BookCategory.DRAMA]: 'Drame',
  [BookCategory.MUSICAL]: 'Musical',
  [BookCategory.ROMANCE]: 'Romance',
  [BookCategory.SCI_FI]: 'Science-Fiction',
  [BookCategory.THRILLER]: 'Thriller',
  [BookCategory.WAR]: 'Guerre',
};

export enum BookState {
  NEW = 'Neuf',
  GOOD = 'Bon',
  ACCEPTABLE = 'Acceptable',
  USED = 'Usé',
  MISSING = 'Perdu',
  RETIRED = 'Retiré',
}

export interface PageOfBooks {
  content: Book[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Category {
  category: BookCategory;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
