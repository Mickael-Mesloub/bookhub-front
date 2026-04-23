import { Component } from '@angular/core';
import { BookDetail } from "../../pages/book-detail/book-detail";
import { Book } from '../../models/book-models';

@Component({
  selector: 'app-book-description',
  imports: [BookDetail],
  templateUrl: './book-description.html',
  styleUrl: './book-description.scss',
})
export class BookDescription {
  book!: Book
}
