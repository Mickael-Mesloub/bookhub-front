import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { BookService } from '../../services/book-service';

import { NgClass } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';
import { Button } from '../../../../components/shared/button/button';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import { createBookFormSchema, createBookModel } from '../../models/book-form-model';
import { BookCategory } from '../../models/book-models';
import { CreateBookService } from '../../services/create-book-service';

@Component({
  selector: 'app-create-book-form',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './create-book-form.html',
  styleUrl: './create-book-form.scss',
})
export class CreateBookForm {
  private readonly createBookService: CreateBookService = inject(CreateBookService);
  private readonly bookService: BookService = inject(BookService);
  pageTitle: InputSignal<string> = input('');
  isLoading: Signal<boolean> = computed(() => this.createBookService.isLoading());
  bookData = computed(() => this.createBookService.book());
  model = computed(() => createBookModel(this.bookData() ?? undefined));

  form = form(this.model(), (schema) => {
    createBookFormSchema(schema);
  });

  categoryOptions = Object.entries(BookCategory).map(([key, value]) => ({
    key,
    value,
  }));

  protected onSubmit(): void {
    this.createBookService.createBook(this.form().value());
  }
}
