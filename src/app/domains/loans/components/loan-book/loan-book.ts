import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Book, BookCopy } from '../../../books/models/book-models';
import { BookCopyService } from '../../../books/services/book-copy-service';
import { ApiResponse } from '../../../../config/api/api';
import { Button } from '../../../../components/shared/button/button';

@Component({
  selector: 'app-loan-book',
  imports: [Button],
  templateUrl: './loan-book.html',
  styleUrl: './loan-book.scss',
})
export class LoanBook implements OnInit {
  book: InputSignal<Book> = input.required<Book>();

  bookCopyService: BookCopyService = inject(BookCopyService)
  bookCopies: BookCopy[] = []

   ngOnInit(){
     this.fetchAllCopies(this.book().isbn)
   }

  fetchAllCopies(isbn: string): void {
    this.bookCopyService.getBookCopies(isbn).subscribe({
      next: (response: ApiResponse<BookCopy[]>) => {
        this.bookCopies = response.data
      },
      error: (err) => console.error('Failed to fetch copies: ', err),
    });
  }

  checkAvailable(copies: BookCopy[]): boolean {
    return this.bookCopyService.checkAvailable(copies)
  }

  addToWishlist(){
    console.log("AJOUT A LA WISHLIST, UN JOUR")
  }

  loanBook(){
    console.log("LE BOOK A ETE LOANED")
  }

  }
