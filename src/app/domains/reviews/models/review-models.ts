import { Pageable, Review, Sort } from "../../books/models/book-models";

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