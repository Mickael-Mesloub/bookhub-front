import { Component, inject, input, InputSignal } from '@angular/core';
import { BookService } from '../../services/book-service';
import { Router } from '@angular/router';
import { Button } from "../../../../components/shared/button/button";
import { Book } from '../../models/book-models';

@Component({
  selector: 'app-book-card',
  imports: [Button],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  private readonly router = inject(Router)
  book: InputSignal<Book> = input.required() 
  bookService: BookService = inject(BookService);

  goToDetail(){
       this.router.navigate(['/detail/{isbn}'])
 }
}
