import { Component, inject } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Button } from '../../../../components/shared/button/button';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import { BookService } from '../../services/book-service';
import { BookCategory } from '../../models/book-models';
import { createBookFormSchema, createBookModel } from '../../models/book-form-model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-create-book-page',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './create-book-page.html',
  styleUrl: './create-book-page.scss',
})
export class CreateBookPage {
  bookService: BookService = inject(BookService);

  categoryOptions = Object.entries(BookCategory).map(([key, value]) => ({
    key,
    value,
  }));

  protected readonly model = createBookModel();

  protected readonly form = form(this.model, (schema) => {
    createBookFormSchema(schema);
  });

  protected onSubmit(): void {
    console.log('Form value :', this.form().value());
  }
}
