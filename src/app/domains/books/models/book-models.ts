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
  ADVENTURE = 'Aventure',
  ANIMATION = 'Animation',
  COMEDY = 'Comédie',
  CRIME = 'Crime',
  DOCUMENTARY = 'Documentaire',
  DRAMA = 'Drame',
  MUSICAL = 'Musical',
  ROMANCE = 'Romance',
  SCI_FI = 'Science-Fiction',
  THRILLER = 'Thriller',
  WAR = 'Guerre',
}

export enum BookState {
  NEW,
  GOOD,
  ACCEPTABLE,
  USED,
  MISSING,
  RETIRED,
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
