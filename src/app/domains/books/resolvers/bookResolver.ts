import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Book } from "../models/book-models";
import { inject } from "@angular/core";
import { BookService } from "../services/book-service";
import { ApiResponse } from "../../../config/api/api";
import { map } from "rxjs";

export const bookResolver: ResolveFn<Book> = (
 route: ActivatedRouteSnapshot,
 state: RouterStateSnapshot,
) => {
 const bookService = inject(BookService);
 const bookId = route.paramMap.get('id')!;

 return bookService.getBookById(Number.parseInt(bookId)).pipe(
    map((response: ApiResponse<Book>) => response.data)
  );
};
