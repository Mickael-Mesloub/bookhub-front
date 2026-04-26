import { Component, inject } from '@angular/core';
import { BookService } from '../../../../books/services/book-service';
import { NotificationService } from '../../../../../components/shared/notification/service/notification-service';
import { Router } from '@angular/router';
import { Book, BookCategory } from '../../../../books/models/book-models';
import {
  BookFormData,
  saveBookFormSchema,
  saveBookModel,
} from '../../../../books/models/book-form-model';
import { form, FormField } from '@angular/forms/signals';
import { ApiErrorResponse, ApiResponse } from '../../../../../config/api/api';
import { NgClass } from '@angular/common';
import { CustomInput } from '../../../../../components/shared/custom-input/custom-input';
import { Button } from '../../../../../components/shared/button/button';

@Component({
  selector: 'app-save-book-form',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './save-book-form.html',
  styleUrl: './save-book-form.scss',
})
export class SaveBookForm {
  private readonly bookService: BookService = inject(BookService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  categoryOptions = Object.entries(BookCategory).map(([key, value]) => ({
    key,
    value,
  }));

  protected readonly model = saveBookModel();

  protected readonly form = form(this.model, (schema) => {
    saveBookFormSchema(schema);
  });

  protected saveBook(bookData: BookFormData): void {
    this.bookService.saveBook(bookData).subscribe({
      next: (response: ApiResponse<Book>) => {
        this.notificationService.openNotification({
          type: 'alert-success',
          message: response.message,
        });
        this.router.navigate(['/dashboard']);
      },
      error: (response: ApiErrorResponse) => {
        console.error('ERROR IN saveBook() : ', response);
        this.notificationService.openNotification({
          type: 'alert-error',
          message: response.error.message,
        });
      },
    });
  }

  protected onSubmit(): void {
    this.saveBook(this.form().value());
  }
}
