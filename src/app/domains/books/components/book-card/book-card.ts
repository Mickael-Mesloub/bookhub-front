import { Component, inject, input, InputSignal } from '@angular/core';
import { BookService } from '../../services/book-service';
import { Router } from '@angular/router';
import { Book } from '../../models/book-models';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  private readonly router = inject(Router);
  book: InputSignal<Book> = input.required<Book>();
  bookService: BookService = inject(BookService);

  navigateToDetails(id: string): void {
    this.router.navigateByUrl(`/detail/${id}`);
  }
}
