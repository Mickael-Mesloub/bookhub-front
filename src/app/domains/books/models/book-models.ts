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

export enum AvailabilityCategory{
  NOW = "Actuellement disponible",
  RESA = "Disponible sur liste d'attente"
}

// -------------------------------------------------------------------------------------------
// Création d'un MAPPED TYPE - clés dynamiques, calculées depuis E
// -------------------------------------------------------------------------------------------
// les [] : les clés ne sont pas fixes — elles sont calculées dynamiquement à partir de keyof E
// on crée un objet dynamiquement grace aux [] en indiquant q les clés sont les clé de E et la valeur est boolean
// pour chaque clé K de E (mon Enum) la valeur est booléenne
// -------------------------------------------------------------------------------------------
export type TypeCreatedFromEnum<E> = {
  [K in keyof E]: boolean;
}
// On ajoute ALL par dessus -> TS interdit de mélanger les clés fixes et un mapped type dans le mm objet
export type TypeCreatedFromEnumWithALL<E> = { ALL: boolean; } & TypeCreatedFromEnum<E>;

export enum SortCategory{
  TITLE_ATOZ       = "Titre A->Z",
  TITLE_ZTOA       = "Titre Z->A",
  BEST_NOTE        = "Mieux notés",
  // MOST_RECENT_DATE = "Date de parution récente",
}

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
