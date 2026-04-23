import { Component, input, InputSignal } from '@angular/core';
import { Book } from '../../../books/models/book-models';

@Component({
  selector: 'app-review-book',
  imports: [],
  templateUrl: './review-book.html',
  styleUrl: './review-book.scss',
})
export class ReviewBook {
  book: InputSignal<Book> = input.required<Book>();
}
