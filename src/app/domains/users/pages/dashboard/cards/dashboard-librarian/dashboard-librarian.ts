import { Component, inject, OnInit, signal } from '@angular/core';
import { NotificationService } from '../../../../../../components/shared/notification/service/notification-service';
import { AuthService } from '../../../../services/auth-service';
import { LoanService } from '../../../../../loans/services/loan-service';
import { ApiResponse } from '../../../../../../config/api/api';
import { BookService } from '../../../../../books/services/book-service';
import { DashboardService } from '../../services/dashboard-service';
import { DashboardDTO } from '../../../../models/user-models';

@Component({
  selector: 'app-dashboard-librarian',
  imports: [],
  templateUrl: './dashboard-librarian.html',
  styleUrl: './dashboard-librarian.scss',
})
export class DashboardLibrarian implements OnInit {
  private readonly authService = inject(AuthService);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
  loanService: LoanService = inject(LoanService);
  bookService: BookService = inject(BookService);
  notificationService: NotificationService = inject(NotificationService);
  dashboardDTO = signal<DashboardDTO | null>(null);
  dashboardService: DashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.fetchAllInfo();
  }

  fetchAllInfo() {
    this.notificationService.openNotification({
      type: 'loading',
      message: 'Nous recherchons les infos pour les bibliothécaires',
    });
    this.dashboardService.getAllInfo().subscribe({
      next: (response: ApiResponse<DashboardDTO>) => {
        this.dashboardDTO.set(response.data);
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
