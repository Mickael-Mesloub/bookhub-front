import { NgClass } from '@angular/common';
import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Button } from '../../../../components/shared/button/button';
import {
  BookCopyFormData,
  BookCopyStateOption,
  createBookCopyFormSchema,
  updateBookCopyModel,
} from '../../../books/models/book-copy-form-model';
import { CreateCopyService } from '../../../books/services/create-copy-service';
import { Loan } from '../../loan-models';
import { LoanService } from '../../services/loan-service';

@Component({
  selector: 'app-return-book-form',
  imports: [FormField, NgClass, Button],
  templateUrl: './return-book-form.html',
  styleUrl: './return-book-form.scss',
})
export class ReturnBookForm {
  private readonly createBookCopyService: CreateCopyService = inject(CreateCopyService);
  private readonly loanService: LoanService = inject(LoanService);

  data: InputSignal<Loan> = input.required();
  loan = signal<Loan | null>(null);

  stateOptions!: BookCopyStateOption[];

  // Model for create book copy form
  model = signal<WritableSignal<BookCopyFormData>>(updateBookCopyModel(this.loan()?.bookCopy!));

  // Signal form with model (initial value) and schema (validation)
  form = form<BookCopyFormData>(this.model(), (schema) => {
    createBookCopyFormSchema(schema);
  });

  ngOnInit(): void {
    this.stateOptions = this.createBookCopyService.stateOptions;
    this.loan.set(this.data());
  }

  protected onSubmit(): void {
    console.log(this.form().value());
    console.log(this.loan());

    // this.loanService.returnBook({
    //   loan: this.loan() as Loan,
    //   bookCopy: this.bookCopy() as BookCopy,
    // });
  }
}
