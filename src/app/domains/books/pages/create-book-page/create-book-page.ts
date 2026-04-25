import { NgClass } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Button } from '../../../../components/shared/button/button';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import {
  CreateBookFormData,
  createBookFormSchema,
  createBookModel,
} from '../../models/book-form-model';
import { BookCategory, BookCategoryOptionLabels } from '../../models/book-models';
import { CreateBookService } from '../../services/create-book-service';

interface BookCategoryOption {
  key: string;
  value: BookCategory;
}

@Component({
  selector: 'app-create-book-page',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './create-book-page.html',
  styleUrl: './create-book-page.scss',
})
export class CreateBookPage {
  private readonly createBookService: CreateBookService = inject(CreateBookService);

  // Model for create book form
  model = signal<WritableSignal<CreateBookFormData>>(createBookModel());

  // Labels for category options
  BookCategoryOptionLabels = BookCategoryOptionLabels;

  // List of category options (label and value) for select input
  categoryOptions: BookCategoryOption[] = Object.entries(BookCategory).map(([_, value]) => ({
    key: BookCategoryOptionLabels[value],
    value,
  }));

  // Signal form with model (initial value) and schema (validation)
  form = form<CreateBookFormData>(this.model(), (schema) => {
    createBookFormSchema(schema);
  });

  protected onSubmit(): void {
    this.createBookService.createBook(this.form().value());
  }

  // TODO: move in edit book when ready
  // fetchBook(): void {
  //   this.bookService.getBookDetail(this.isbn()).subscribe({
  //     next: (response: ApiResponse<Book>) => {
  //       this.createBookService.book.set(response.data);
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch book: ', err);
  //       this.createBookService.isLoading.set(false);
  //     },
  //   });
  // }
}
