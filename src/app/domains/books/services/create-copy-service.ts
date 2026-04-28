import { inject, Injectable } from '@angular/core';
import { BookCopyFormData, BookCopyStateOption } from '../models/book-copy-form-model';
import { BookCopy, BookCopyStateOptionLabels, BookState } from '../models/book-models';
import { BookCopyService } from './book-copy-service';
import { ApiErrorResponse, ApiResponse } from '../../../config/api/api';
import { NotificationService } from '../../../components/shared/notification/service/notification-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreateCopyService {
  private readonly bookCopyService: BookCopyService = inject(BookCopyService);
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly router: Router = inject(Router);

  // Labels for book state select options
  BookCopyStateOptionLabels: Record<BookState, string> = BookCopyStateOptionLabels;

  // List of book state options (label and value) for select input
  stateOptions: BookCopyStateOption[] = Object.entries(BookState).map(([_, value]) => ({
    key: BookCopyStateOptionLabels[value],
    value,
  }));

  createBookCopy(bookId: number, bookCopyData: BookCopyFormData): void {
    this.bookCopyService.createBookCopy(bookId, bookCopyData).subscribe({
          next: (response: ApiResponse<BookCopy>) => {
            this.notificationService.openNotification({
              type: 'alert-success',
              message: response.message,
            });
            // this.router.navigateByUrl(`/detail/${response.data.id.toString()}`);
          },
          error: (response: ApiErrorResponse) => {
            console.error('ERROR IN createBookCopy() : ', response);
            this.notificationService.openNotification({
              type: 'alert-error',
              message: response.error.message,
            });
          },
        });
  }
}
