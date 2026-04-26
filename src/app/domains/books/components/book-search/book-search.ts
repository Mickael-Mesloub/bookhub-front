import { Component, inject, signal } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { BookCategory } from '../../models/book-models';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-search',
  imports: [RouterLinkActive],
  templateUrl: './book-search.html',
  styleUrl: './book-search.scss',
})
export class BookSearch {
  readonly #bookService = inject(BookService);
  bookList = signal(this.#bookService.getAllBooks());
  readonly searchTerm = signal('');

  categories: string[] = Object.values(BookCategory);
  dispoCategories: string[] = ['Disponible', 'Non disponible'];
}
