import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../components/shared/notification/service/notification-service';
import { ApiErrorResponse, ApiResponse } from '../../../config/api/api';
import { BookFormData } from '../models/book-form-model';
import { Book } from '../models/book-models';
import { BookService } from './book-service';

@Injectable({
  providedIn: 'root',
})
export class UpdateBookService {
  private readonly bookService: BookService = inject(BookService);
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly router: Router = inject(Router);

  updateBook(bookId: number, bookData: BookFormData): void {
    this.bookService.updateBook(bookId, bookData).subscribe({
      next: (response: ApiResponse<Book>) => {
        this.notificationService.show({
          type: 'alert-success',
          message: response.message,
        });
        this.router.navigateByUrl(`/detail/${bookData.isbn}`);
      },
      error: (response: ApiErrorResponse) => {
        console.error('ERROR IN createBook() : ', response);
        this.notificationService.show({
          type: 'alert-error',
          message: response.error.message,
        });
      },
    });
  }
}
