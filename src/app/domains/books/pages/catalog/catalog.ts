import { Component, inject, OnInit } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';
import { BookService } from '../../services/book-service';
import { Book, PageOfBooks } from '../../models/book-models';
import { ApiResponse } from '../../../../config/api/api';


@Component({
  selector: 'app-catalog',
  imports: [BookCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  bookService: BookService = inject(BookService);
  books: Book[] = [];
  currentPage: number = 0

  ngOnInit() {
    this.fetchAllBooks(this.currentPage);
  }

  fetchAllBooks(page?: number, size?: number, sort?: string): void {
    this.bookService.getAllBooks(page, size, sort).subscribe({
      next: (response: ApiResponse<PageOfBooks>) => {
        this.books = response.data.content
      },
      error: (err) => console.error('Failed to fetch books: ', err),
    });
  }

  nextPage(): void{
    this.currentPage ++
    this.fetchAllBooks(this.currentPage);
  }

  previousPage(): void{
    if(this.currentPage > 0){
      this.currentPage --
    }
    this.fetchAllBooks(this.currentPage);
  }
}
