import { Component } from '@angular/core';
import { BookDescription } from './book-description/book-description';

@Component({
  selector: 'app-book-detail',
  imports: [BookDescription],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {}
