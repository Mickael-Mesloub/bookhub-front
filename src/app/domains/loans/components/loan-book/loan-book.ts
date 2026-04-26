import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Book, BookCopy } from '../../../books/models/book-models';
import { BookCopyService } from '../../../books/services/book-copy-service';
import { API_BASE_URL, ApiResponse } from '../../../../config/api/api';
import { Button } from '../../../../components/shared/button/button';
import { AuthService } from '../../../users/services/auth-service';
import { Router } from '@angular/router';
import { Loan, LoanDTO } from '../../loan-models';
import { LoanService } from '../../services/loan-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loan-book',
  imports: [Button],
  templateUrl: './loan-book.html',
  styleUrl: './loan-book.scss',
})
export class LoanBook implements OnInit {
  bookCopyService: BookCopyService = inject(BookCopyService);
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  loanService: LoanService = inject(LoanService);
  bookCopies: BookCopy[] = [];
  book: InputSignal<Book> = input.required<Book>();
  loan?: Loan;

  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAllCopies(this.book().isbn);
  }

  fetchAllCopies(isbn: string): void {
    this.bookCopyService.getBookCopies(isbn).subscribe({
      next: (response: ApiResponse<BookCopy[]>) => {
        this.bookCopies = response.data;
      },
      error: (err) => console.error('Failed to fetch copies: ', err),
    });
  }

  addToWishlist() {
    console.log('AJOUT A LA WISHLIST, UN JOUR');
  }

  loanBook() {
    let loanDTO!: LoanDTO;
    // TODO: remplacer par un token (un jour)
    loanDTO.username = this.loanService.checkUsernameValid(this.currentUser()?.username);
    loanDTO.isbn = this.book().isbn;
    if (loanDTO.username != '') {
      this.http
        .post<any>(`${API_BASE_URL} + /books/loan`, { title: 'Loan Book' })
        .subscribe((data) => {
          console.log('CA VA MARCHER BIENTOT');
          // this.loan.copyId = data.copyId;
          // this.loan.dateLoaned = data.dateLoaned;
          // this.loan.id = data.id
          // this.loan.userId = data.userId
        });
    } else {
      this.goToLogin();
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
