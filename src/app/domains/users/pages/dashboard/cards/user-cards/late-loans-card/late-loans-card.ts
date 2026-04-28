import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../../services/auth-service';
import { LoanService } from '../../../../../../loans/services/loan-service';
import { UserService } from '../../../../../services/user-service';
import { NotificationService } from '../../../../../../../components/shared/notification/service/notification-service';
import { ApiResponse } from '../../../../../../../config/api/api';
import { Loan } from '../../../../../../loans/loan-models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-late-loans-card',
  imports: [DatePipe],
  templateUrl: './late-loans-card.html',
  styleUrl: './late-loans-card.scss',
})
export class LateLoansCard implements OnInit {
  private readonly authService = inject(AuthService);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
  loanService: LoanService = inject(LoanService);
  userService: UserService = inject(UserService);
  notificationService: NotificationService = inject(NotificationService);
  lateLoans: WritableSignal<Loan[] | []> = signal([]);

  ngOnInit(): void {
    this.fetchLateLoans();
  }

  fetchLateLoans() {
    this.notificationService.openNotification({
      type: 'loading',
      message: 'Nous recherchons vos emprunts en cours...',
    });
    // async
    const userID = this.userService.checkUserID(this.currentUser()?.id);
    if (userID != 0) {
      this.loanService.getAllLateLoans(userID).subscribe({
        next: (response: ApiResponse<Loan[]>) => {
          this.lateLoans.set(response.data);
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
