import { Component, inject } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Button } from '../../../../components/shared/button/button';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import { BookService } from '../../services/book-service';
import { Book, BookCategory } from '../../models/book-models';
import { BookFormData, createBookFormSchema, createBookModel } from '../../models/book-form-model';
import { NgClass } from '@angular/common';
import { NotificationService } from '../../../../components/shared/notification/service/notification-service';
import { Router } from '@angular/router';
import { ApiErrorResponse, ApiResponse } from '../../../../config/api/api';

@Component({
  selector: 'app-create-book-page',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './create-book-page.html',
  styleUrl: './create-book-page.scss',
})
export class CreateBookPage {
  private readonly bookService: BookService = inject(BookService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  categoryOptions = Object.entries(BookCategory).map(([key, value]) => ({
    key,
    value,
  }));

  protected readonly model = createBookModel();

  protected readonly form = form(this.model, (schema) => {
    createBookFormSchema(schema);
  });

  protected saveBook(bookData: BookFormData): void {
    this.bookService.createBook(bookData).subscribe({
      next: (response: ApiResponse<Book>) => {
        this.notificationService.show({
          type: 'alert-success',
          message: response.message,
        });
        this.router.navigate(['/auth/login']);
      },
      error: (response: ApiErrorResponse) => {
        console.error("ERROR IN saveBook() : ", response);
        this.notificationService.show({
          type: 'alert-error',
          message: response.error.message,
        });
      },
    });
  }

  protected onSubmit(): void {
    console.log('Form value :', this.form().value());
    this.saveBook(this.form().value());
  }
}
