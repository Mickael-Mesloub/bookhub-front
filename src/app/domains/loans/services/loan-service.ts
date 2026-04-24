import { inject, Injectable } from '@angular/core';
import { BookCopy } from '../../books/models/book-models';
import { BookCopyService } from '../../books/services/book-copy-service';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  bookCopyService: BookCopyService = inject(BookCopyService);

  checkUsernameValid(username: string | undefined): string {
    if (username != undefined) {
      return username;
    }
    return '';
  }

  checkAvailable(copies: BookCopy[]): boolean {
    return this.bookCopyService.checkAvailable(copies);
  }
}
