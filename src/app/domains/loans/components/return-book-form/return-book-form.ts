import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Button } from '../../../../components/shared/button/button';
import {
  BookCopyFormData,
  BookCopyStateOption,
  createBookCopyFormSchema,
  createBookCopyModel,
} from '../../../books/models/book-copy-form-model';
import { CreateCopyService } from '../../../books/services/create-copy-service';

@Component({
  selector: 'app-return-book-form',
  imports: [FormField, NgClass, Button],
  templateUrl: './return-book-form.html',
  styleUrl: './return-book-form.scss',
})
export class ReturnBookForm implements OnInit {
  private readonly createBookCopyService: CreateCopyService = inject(CreateCopyService);

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
