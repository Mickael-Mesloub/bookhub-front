import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../../services/auth-service';
import { NotificationService } from '../../../../../../../components/shared/notification/service/notification-service';
import { LoanService } from '../../../../../../loans/services/loan-service';
import { Loan } from '../../../../../../loans/loan-models';
import { UserService } from '../../../../../services/user-service';
import { ApiResponse } from '../../../../../../../config/api/api';

@Component({
  selector: 'app-open-loans-card',
  imports: [],
  templateUrl: './open-loans-card.html',
  styleUrl: './open-loans-card.scss',
})
export class OpenLoansCard implements OnInit {
  private readonly authService = inject(AuthService);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
  loanService: LoanService = inject(LoanService);
  userService: UserService = inject(UserService);
  notificationService: NotificationService = inject(NotificationService);
  openLoans: WritableSignal<Loan[] | []> = signal([]);

  ngOnInit(): void {
    this.fetchOpenLoans();
  }

  fetchOpenLoans() {
    this.notificationService.openNotification({
      type: 'loading',
      message: 'Nous recherchons vos emprunts en cours...',
    });
    // async
    const userID = this.userService.checkUserID(this.currentUser()?.id);
    if (userID != 0) {
      this.loanService.getAllOpenLoansByUser(userID).subscribe({
        next: (response: ApiResponse<Loan[]>) => {
          this.openLoans.set(response.data);
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
