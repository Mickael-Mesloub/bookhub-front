import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../book-service';
import { Book } from '../book-models';
import { ApiResponse } from '../../../config/api/api';
import { Button } from "../../../components/shared/button/button";

@Component({
  selector: 'app-catalog',
  imports: [Button],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  bookService: BookService = inject(BookService);
  books: Book[] = [];

  ngOnInit() {
    this.fetchAllBooks();
  }

  fetchAllBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response: ApiResponse<Book[]>) => {
        for (const book of response.data) {
          this.books.push(book);
        }
      },
      error: (err) => console.error('Failed to fetch books: ', err),
    });
  }
}
