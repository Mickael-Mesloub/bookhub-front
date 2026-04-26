import { NgClass } from '@angular/common';
import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Button } from '../../../../components/shared/button/button';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import { BookFormData, createBookFormSchema, updateBookModel, type BookCategoryOption } from '../../models/book-form-model';
import { BookService } from '../../services/book-service';
import { UpdateBookService } from '../../services/update-book-service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Book } from '../../models/book-models';

@Component({
  selector: 'app-update-book-page',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './update-book-page.html',
  styleUrl: './update-book-page.scss',
})
export class UpdateBookPage {
  private readonly createBookService: UpdateBookService = inject(UpdateBookService);
  private readonly bookService: BookService = inject(BookService);
  categoryOptions!: BookCategoryOption[];

  route: ActivatedRoute = inject(ActivatedRoute);
  data = toSignal(this.route.data);

  // get book data from resolver
  book: Signal<Book> = computed(() => this.data()?.['book'] as Book)

  // Model for update book form
  model = signal<WritableSignal<BookFormData>>(updateBookModel(this.book()));

  // TODO: fix Category select value

  // Signal form with model (initial value) and schema (validation)
   form = form<BookFormData>(this.model(), (schema) => {
     createBookFormSchema(schema);
   });

  protected onSubmit(): void {
    this.createBookService.updateBook(this.book().id, this.form().value());
  }
}
