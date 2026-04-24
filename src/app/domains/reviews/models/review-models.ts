import { Book, Pageable, Sort } from "../../books/models/book-models";
import { User } from "../../users/models/user-models";

export interface ReviewModels {

}

export interface PageOfReviews {
      content: Review[];
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

export interface Review {
  id: number;
  comment: string;
  score: number;
  book: Book;
  user: User;
  datePublished: Date
}