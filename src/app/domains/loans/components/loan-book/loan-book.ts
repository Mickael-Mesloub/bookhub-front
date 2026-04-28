import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Book, BookCopy } from '../../../books/models/book-models';
import { BookCopyService } from '../../../books/services/book-copy-service';
import { ApiErrorResponse, ApiResponse } from '../../../../config/api/api';
import { Button } from '../../../../components/shared/button/button';
import { AuthService } from '../../../users/services/auth-service';
import { Router } from '@angular/router';
import { Loan, LoanDTO } from '../../loan-models';
import { LoanService } from '../../services/loan-service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../components/shared/notification/service/notification-service';
import { ReservationService } from '../../../reservations/services/reservation-service';
import { UserService } from '../../../users/services/user-service';
import { ReservationDto } from '../../../reservations/models/reservation-models';

@Component({
  selector: 'app-loan-book',
  imports: [Button],
  templateUrl: './loan-book.html',
  styleUrl: './loan-book.scss',
})
export class LoanBook implements OnInit {
  bookCopyService: BookCopyService = inject(BookCopyService);
  reservationService: ReservationService = inject(ReservationService);
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  loanService: LoanService = inject(LoanService);
  userService: UserService = inject(UserService);
  bookCopies: BookCopy[] = [];
  book: InputSignal<Book> = input.required<Book>();
  loan?: Loan;

  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
  private readonly notificationService: NotificationService = inject(NotificationService);

  constructor(private readonly http: HttpClient) {}

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

  addReservation(idBookToResa: number, idUser: number): void {
    console.log('CLICK idBookToResa:', idBookToResa);
    console.log('CLICK idUser:', idUser);

    if (!this.isAuthenticated() || !idUser) {
      this.goToLogin();
      return;
    }
    this.reservationService.addReservation(idBookToResa, idUser).subscribe({
      next: (response: ApiResponse<ReservationDto>) => {
        this.notificationService.openNotification({
          type: 'alert-success',
          message: response.message,
        });
      },
      error: (response: ApiErrorResponse) => {
        console.error('RESERVATION HAS FAILED : ', response);
        this.notificationService.openNotification({
          type: 'alert-error',
          message: response.error.message,
        });
      },
    });
  }

  loanBook(): void {
    let loanDTO: LoanDTO = { username: '', isbn: '' };
    // TODO: remplacer par un token (un jour)
    loanDTO.username = this.userService.checkUsernameValid(this.currentUser()?.username);
    loanDTO.isbn = this.book().isbn;
    if (loanDTO.username != '') {
      this.loanService.createLoan(loanDTO).subscribe({
        next: (response: ApiResponse<Loan>) => {
          this.notificationService.openNotification({
            type: 'alert-success',
            message: response.message,
          });
        },
        error: (response: ApiErrorResponse) => {
          console.error('ERROR IN loanBook() : ', response);
          this.notificationService.openNotification({
            type: 'alert-error',
            message: response.error.message,
          });
        },
      });
    } else {
      this.goToLogin();
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
