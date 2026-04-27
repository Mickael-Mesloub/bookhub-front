import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Button } from '../../../../components/shared/button/button';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import { BookFormData, createBookFormSchema, createBookModel, type BookCategoryOption } from '../../models/book-form-model';
import { CreateBookService } from '../../services/create-book-service';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-create-book-page',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './create-book-page.html',
  styleUrl: './create-book-page.scss',
})
export class CreateBookPage implements OnInit{
  private readonly createBookService: CreateBookService = inject(CreateBookService);
  private readonly bookService: BookService = inject(BookService);
  categoryOptions!: BookCategoryOption[];

  // Model for create book form
  model = signal<WritableSignal<BookFormData>>(createBookModel());

  // Signal form with model (initial value) and schema (validation)
  form = form<BookFormData>(this.model(), (schema) => {
    createBookFormSchema(schema);
  });

  ngOnInit(): void {
    this.categoryOptions = this.bookService.categoryOptions;
  }

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
