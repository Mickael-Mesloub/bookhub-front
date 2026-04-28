import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../../services/auth-service';
import { ApiResponse } from '../../../../../../../config/api/api';
import { NotificationService } from '../../../../../../../components/shared/notification/service/notification-service';
import { Loan } from '../../../../../../loans/loan-models';
import { LoanService } from '../../../../../../loans/services/loan-service';
import { UserService } from '../../../../../services/user-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-books-read-card',
  imports: [DatePipe],
  templateUrl: './books-read-card.html',
  styleUrl: './books-read-card.scss',
})
export class BooksReadCard implements OnInit {
  private readonly authService = inject(AuthService);
  loanService: LoanService = inject(LoanService);
  userService: UserService = inject(UserService);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
  notificationService: NotificationService = inject(NotificationService);
  allLoans: WritableSignal<Loan[] | []> = signal([]);

  ngOnInit(): void {
    this.fetchAllLoans();
  }

  fetchAllLoans() {
    this.notificationService.openNotification({
      type: 'loading',
      message: 'Nous recherchons tous vos livres lus...',
    });
    // async
    const userID = this.userService.checkUserID(this.currentUser()?.id);
    if (userID != 0) {
      this.loanService.getAllLoansByUser(userID).subscribe({
        next: (response: ApiResponse<Loan[]>) => {
          this.allLoans.set(response.data);
          // à la fin de l'appel API (success ou error) : fermer écran de chargement
          this.notificationService.closeNotification();
        },
        error: (err) => {
          console.error('Failed to fetch books: ', err);
          // à la fin de l'appel API (success ou error) : fermer écran de chargement
          this.notificationService.closeNotification();
        },
      });
    }
  }
}
