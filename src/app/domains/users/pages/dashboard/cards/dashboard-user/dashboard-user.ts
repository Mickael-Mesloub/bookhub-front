import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';
import { UserService } from '../../../../services/user-service';
import { NotificationService } from '../../../../../../components/shared/notification/service/notification-service';
import { ApiResponse } from '../../../../../../config/api/api';
import { Book } from '../../../../../books/models/book-models';
import { Reservations } from '../../../../../reservations/reservations';
import { Button } from '../../../../../../components/shared/button/button';
import { Router } from '@angular/router';
import { OpenLoansCard } from '../user-cards/open-loans-card/open-loans-card';
import { BooksReadCard } from '../user-cards/books-read-card/books-read-card';
import { LateLoansCard } from '../user-cards/late-loans-card/late-loans-card';

@Component({
  selector: 'app-dashboard-user',
  imports: [Reservations, Button, BooksReadCard, LateLoansCard, OpenLoansCard],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.scss',
})
export class DashboardUser implements OnInit {
  private readonly authService = inject(AuthService);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
  userService: UserService = inject(UserService);
  notificationService: NotificationService = inject(NotificationService);
  router: Router = inject(Router);

  loanedBooks: WritableSignal<Book[] | null> = signal(null);
  showUpdate: boolean = false;

  ngOnInit() {
    this.getAllLoanedBooks();
  }

  getAllLoanedBooks() {
    // avant un async: écran de chargement...
    this.notificationService.openNotification({
      type: 'loading',
      message: 'Nous recherchons vos livres...',
    });
    // async
    this.userService
      .getAllLoanedBooksByUser(this.userService.checkUsernameValid(this.currentUser()?.username))
      .subscribe({
        next: (response: ApiResponse<Book[]>) => {
          this.loanedBooks.set(response.data);
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

  goToEditProfile() {
    this.router.navigate(['/auth/profile/edit']);
  }
}
