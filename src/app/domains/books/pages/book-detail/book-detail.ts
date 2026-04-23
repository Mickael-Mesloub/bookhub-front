import { Component, input, InputSignal } from '@angular/core';
import { BookDescription } from '../../components/book-description/book-description';
import { Book } from '../../models/book-models';


@Component({
  selector: 'app-book-detail',
  imports: [BookDescription],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})

export class BookDetail {
  book: InputSignal<Book> = input.required() 

}
