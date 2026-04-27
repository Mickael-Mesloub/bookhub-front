import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../components/shared/notification/service/notification-service';
import { ApiErrorResponse, ApiResponse } from '../../../config/api/api';
import { BookFormData } from '../models/book-form-model';
import { Book } from '../models/book-models';
import { BookService } from './book-service';

@Injectable({
  providedIn: 'root',
})
export class CreateBookService {
  private readonly bookService: BookService = inject(BookService);
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly router: Router = inject(Router);

  book: WritableSignal<Book | undefined> = signal<Book | undefined>(undefined);

  createBook(bookData: BookFormData): void {
    this.bookService.createBook(bookData).subscribe({
      next: (response: ApiResponse<Book>) => {
        this.notificationService.openNotification({
          type: 'alert-success',
          message: response.message,
        });
        this.router.navigate(['/dashboard']);
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
