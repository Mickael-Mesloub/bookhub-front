import { Component, inject, input, InputSignal } from '@angular/core';
import { Book } from '../../book-models';
import { BookService } from '../../book-service';
import { ApiResponse } from '../../../../config/api/api';
import { Router } from '@angular/router';
import { Button } from "../../../../components/shared/button/button";

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
       this.router.navigate(['/detail'])
 }
}
