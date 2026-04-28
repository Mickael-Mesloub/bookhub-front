import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Loan } from '../../../../../loans/loan-models';
import { NotificationService } from '../../../../../../components/shared/notification/service/notification-service';
import { AuthService } from '../../../../services/auth-service';
import { Book } from '../../../../../books/models/book-models';
import { LoanService } from '../../../../../loans/services/loan-service';
import { ApiResponse } from '../../../../../../config/api/api';
import { BookService } from '../../../../../books/services/book-service';

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
  dashboardSignal = signal<any>({});

  ngOnInit(): void {
    this.getDashboardSignal();
  }

  getDashboardSignal() {
    this.fetchTotalBookCount();
    this.fetchActiveLoans();
    this.fetchAllLateLoans();
    this.fetchMostLoanedBooks();
  }

  fetchTotalBookCount() {
    this.notificationService.openNotification({
      type: 'loading',
      message: 'Nous recherchons combien de livres il y a dans la bibliothèque...',
    });
    this.bookService.getBookCount().subscribe({
      next: (response: ApiResponse<number>) => {
        let truc = {};
        this.dashboardSignal.update((values) => {
          return { ...values, bookCount: response.data };
        });
        console.log(this.dashboardSignal);
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

  fetchActiveLoans(): void {
    this.notificationService.openNotification({
      type: 'loading',
      message: 'Nous recherchons tous les emprunts en cours...',
    });
    this.loanService.getAllOpenLoans().subscribe({
      next: (response: ApiResponse<Loan[]>) => {
        this.dashboardSignal.update((values) => {
          return { ...values, openLoans: response.data };
        });
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

  fetchAllLateLoans(): void {
    this.notificationService.openNotification({
      type: 'loading',
      message: 'Nous recherchons tous les retards...',
    });
    this.loanService.getAllLateLoans().subscribe({
      next: (response: ApiResponse<Loan[]>) => {
        this.dashboardSignal.update((values) => {
          return { ...values, lateLoans: response.data };
        });
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

  fetchMostLoanedBooks(): void {
    this.notificationService.openNotification({
      type: 'loading',
      message: 'Nous recherchons les livres les plus lus...',
    });
    this.bookService.getMostReadBooks().subscribe({
      next: (response: ApiResponse<Book[]>) => {
        this.dashboardSignal.update((values) => {
          return { ...values, mostRead: response.data };
        });
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
