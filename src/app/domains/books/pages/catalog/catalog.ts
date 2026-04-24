import { Component, inject, OnInit } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';
import { BookService } from '../../services/book-service';
import { Book, PageOfBooks } from '../../models/book-models';
import { ApiResponse } from '../../../../config/api/api';
import { Button } from '../../../../components/shared/button/button';
import { BookSearch } from '../../components/book-search/book-search';


@Component({
  selector: 'app-catalog',
  imports: [BookCard, Button, BookSearch],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  bookService: BookService = inject(BookService);
  books: Book[] = [];
  bookPage!: PageOfBooks;
  currentPage: number = 0;

  ngOnInit() {
    this.fetchAllBooks();
  }

  fetchAllBooks(page?: number, size?: number, sort?: string): void {
    this.bookService.getAllBooks(page, size, sort).subscribe({
      next: (response: ApiResponse<PageOfBooks>) => {
        this.bookPage = response.data;
        this.books = response.data.content;
        this.currentPage = this.bookPage.number;
      },
      error: (err) => console.error('Failed to fetch books: ', err),
    });
  }

  nextPage(): void {
    if (this.currentPage < this.bookPage.totalPages) {
      this.currentPage++;
      this.fetchAllBooks(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchAllBooks(this.currentPage);
    }
  }
}

