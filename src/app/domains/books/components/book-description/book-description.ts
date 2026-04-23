import { Component, input, InputSignal } from '@angular/core';
import { Book } from '../../models/book-models';

@Component({
  selector: 'app-book-description',
  imports: [],
  templateUrl: './book-description.html',
  styleUrl: './book-description.scss',
})
export class BookDescription {
  book: InputSignal<Book> = input.required() 
}
