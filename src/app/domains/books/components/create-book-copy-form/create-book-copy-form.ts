import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Button } from '../../../../components/shared/button/button';
import {
  BookCopyFormData,
  BookCopyStateOption,
  createBookCopyFormSchema,
  createBookCopyModel,
} from '../../models/book-copy-form-model';
import { BookService } from '../../services/book-service';
import { CreateCopyService } from '../../services/create-copy-service';

@Component({
  selector: 'app-create-book-copy-form',
  imports: [FormField, NgClass, Button],
  templateUrl: './create-book-copy-form.html',
  styleUrl: './create-book-copy-form.scss',
})
export class CreateBookCopyForm implements OnInit {
  private readonly createBookCopyService: CreateCopyService = inject(CreateCopyService);
  private readonly bookService: BookService = inject(BookService);

  bookId = input.required<number>();
  stateOptions!: BookCopyStateOption[];

  // Model for create book copy form
  model = signal<WritableSignal<BookCopyFormData>>(createBookCopyModel());

  // Signal form with model (initial value) and schema (validation)
  form = form<BookCopyFormData>(this.model(), (schema) => {
    createBookCopyFormSchema(schema);
  });

  ngOnInit(): void {
    this.stateOptions = this.createBookCopyService.stateOptions;
  }

  protected onSubmit(): void {
    this.createBookCopyService.createBookCopy(this.bookId(), this.form().value());
  }
}
