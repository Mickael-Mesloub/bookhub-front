import { User } from '../users/user-models';

export interface Book {
  id: number;
  isbn: string;
  author: string;
  coverUrl: string;
  title: string;
  description: string;
  category: BookCategory;
  copies: BookCopy[];
  reviews: Review[];
  waitingList: WaitingList[];
}

export interface BookCopy {
  id: number;
  isAvailable: boolean;
  state: BookState;
  bookId: Book['id'];
}

export interface Review {
  id: number;
  comment: string;
  score: number;
  bookId: Book['id'];
  userId: User['id'];
}

export interface WaitingList {
  id: number;
  dateAdded: Date;
  bookId: Book['id'];
}

export enum BookCategory {
  ACTION,
  ADVENTURE,
  ANIMATION,
  COMEDY,
  CRIME,
  DOCUMENTARY,
  DRAMA,
  MUSICAL,
  ROMANCE,
  SCI_FI,
  THRILLER,
  WAR,
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
  category: string;
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

export type BookDTO = Pick<
  Book,
  'title' | 'author' | 'category' | 'coverUrl' | 'description' | 'isbn'
>;
