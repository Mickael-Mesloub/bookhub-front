import { Component, inject } from '@angular/core';
import { BookService } from '../../book-service';

@Component({
  selector: 'app-create-book-page',
  imports: [],
  templateUrl: './create-book-page.html',
  styleUrl: './create-book-page.scss',
})
export class CreateBookPage {
  bookService: BookService = inject(BookService);
  
}