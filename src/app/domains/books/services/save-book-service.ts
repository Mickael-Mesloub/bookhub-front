import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BookService } from './book-service';
import { NotificationService } from '../../../components/shared/notification/service/notification-service';
import { Router } from '@angular/router';
import { Book } from '../models/book-models';
import { BookFormData } from '../models/book-form-model';
import { ApiErrorResponse, ApiResponse } from '../../../config/api/api';

@Injectable({
  providedIn: 'root',
})
export class SaveBookService {
  private readonly bookService: BookService = inject(BookService);
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly router: Router = inject(Router);

  pageTitle: WritableSignal<string> = signal<string>('');
  book: WritableSignal<Book | undefined> = signal<Book | undefined>(undefined);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  saveBook(bookData: BookFormData): void {
    this.bookService.saveBook(bookData).subscribe({
      next: (response: ApiResponse<Book>) => {
        this.notificationService.show({
          type: 'alert-success',
          message: response.message,
        });
        this.router.navigate(['/dashboard']);
        this.isLoading.set(false);
      },
      error: (response: ApiErrorResponse) => {
        console.error('ERROR IN saveBook() : ', response);
        this.notificationService.show({
          type: 'alert-error',
          message: response.error.message,
        });
        this.isLoading.set(false);
      },
    });
  }
}
