import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../components/shared/notification/service/notification-service';
import { ApiErrorResponse, ApiResponse } from '../../../config/api/api';
import { Book } from '../models/book-models';
import { BookService } from './book-service';

@Injectable({
  providedIn: 'root',
})
export class DeleteBookService {
  private readonly bookService: BookService = inject(BookService);
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly router: Router = inject(Router);

  deleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe({
      next: (response: ApiResponse<Book>) => {
        this.notificationService.openNotification({
          type: 'alert-success',
          message: response.message,
        });
        this.router.navigateByUrl("/");
      },
      error: (response: ApiErrorResponse) => {
        console.error('ERROR IN createBook() : ', response);
        this.notificationService.openNotification({
          type: 'alert-error',
          message: response.error.message,
        });
      },
    });
  }
}
