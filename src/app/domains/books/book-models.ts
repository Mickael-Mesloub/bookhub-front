import { User } from '../users/user-models';

export interface Book {
  isbn: string;
  author: string;
  coverUrl: string;
  title: string;
  category: BookCategory;
  copies: BookCopy[];
  reviews: Review[];
  waitingList: WaitingList[];
}

export interface BookCopy {
  id: number;
  isAvailable: boolean;
  state: BookState;
  isbn: Book['isbn'];
}

export interface Review {
  id: number;
  comment: string;
  score: number;
  bookIsbn: Book['isbn'];
  userId: User['id'];
}

export interface WaitingList {
  id: number;
  dateAdded: Date;
  bookIsbn: Book['isbn'];
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
