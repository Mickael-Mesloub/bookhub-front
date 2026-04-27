import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';
import { UserService } from '../../../../services/user-service';
import { NotificationService } from '../../../../../../components/shared/notification/service/notification-service';
import { ApiResponse } from '../../../../../../config/api/api';
import { Book } from '../../../../../books/models/book-models';

@Component({
  selector: 'app-dashboard-user',
  imports: [],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.scss',
})
export class DashboardUser implements OnInit {
  private readonly authService = inject(AuthService);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
  userService: UserService = inject(UserService);
  notificationService: NotificationService = inject(NotificationService);

  loanedBooks: Book[] = [];

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
          this.loanedBooks = response.data;
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
