import { Component, inject, OnInit } from '@angular/core';
import { BookDescription } from '../../components/book-description/book-description';
import { Book } from '../../models/book-models';


@Component({
  selector: 'app-book-detail',
  imports: [BookDescription],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})

export class BookDetail implements OnInit {
  isbn!: string
  book!: Book;
  bookService = inject(BookService)

  ngOnInit(){
     console.log(this.bookService.getBookDetail(this.isbn))
  }
}
