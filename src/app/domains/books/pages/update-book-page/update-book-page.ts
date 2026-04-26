import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { Button } from '../../../../components/shared/button/button';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import {
  BookFormData,
  createBookFormSchema,
  updateBookModel,
  type BookCategoryOption,
} from '../../models/book-form-model';
import { Book } from '../../models/book-models';
import { BookService } from '../../services/book-service';
import { UpdateBookService } from '../../services/update-book-service';

@Component({
  selector: 'app-update-book-page',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './update-book-page.html',
  styleUrl: './update-book-page.scss',
})
export class UpdateBookPage implements OnInit {
  private readonly updateBookService: UpdateBookService = inject(UpdateBookService);
  private readonly bookService: BookService = inject(BookService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  data = toSignal(this.route.data);
  categoryOptions!: BookCategoryOption[];

  // Get book data tahnks to resolver
  book: Signal<Book> = computed(() => this.data()?.['book'] as Book);

  // Model for update book form
  model = signal<WritableSignal<BookFormData>>(updateBookModel(this.book()));

  ngOnInit(): void {
    this.categoryOptions = this.bookService.categoryOptions;
  }

  // Signal form with model (initial value) and schema (validation)
  form = form<BookFormData>(this.model(), (schema) => {
    createBookFormSchema(schema);
  });

  protected onSubmit(): void {
    this.updateBookService.updateBook(this.book().id, this.form().value());
  }
}
