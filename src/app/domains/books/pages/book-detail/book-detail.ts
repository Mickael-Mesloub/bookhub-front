import { Component } from '@angular/core';
import { BookDescription } from './book-description/book-description';
import { Book } from '../book-models';

@Component({
  selector: 'app-book-detail',
  imports: [BookDescription],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {
  book!: Book;
}
