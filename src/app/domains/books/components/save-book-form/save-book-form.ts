import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { BookService } from '../../services/book-service';

import { BookCategory } from '../../models/book-models';
import { saveBookFormSchema, saveBookModel } from '../../models/book-form-model';
import { form, FormField } from '@angular/forms/signals';
import { NgClass } from '@angular/common';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import { Button } from '../../../../components/shared/button/button';
import { SaveBookService } from '../../services/save-book-service';

@Component({
  selector: 'app-save-book-form',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './save-book-form.html',
  styleUrl: './save-book-form.scss',
})
export class SaveBookForm {
  private readonly saveBookService: SaveBookService = inject(SaveBookService);
  private readonly bookService: BookService = inject(BookService);
  pageTitle: InputSignal<string> = input('');
  isLoading: Signal<boolean> = computed(() => this.saveBookService.isLoading());
  bookData = computed(() => this.saveBookService.book());
  model = computed(() => saveBookModel(this.bookData() ?? undefined));

  form = form(this.model(), (schema) => {
    saveBookFormSchema(schema);
  });

  categoryOptions = Object.entries(BookCategory).map(([key, value]) => ({
    key,
    value,
  }));

  protected onSubmit(): void {
    this.saveBookService.saveBook(this.form().value());
  }
}
