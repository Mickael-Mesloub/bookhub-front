import { Component, inject, signal } from '@angular/core';
import { BookService } from '../../book-service';
import { BookCategory, BookDTO } from '../../book-models';
import { form, required, FormField } from '@angular/forms/signals';
import { Button } from '../../../../components/shared/button/button';
import { CustomInput } from "../../../../components/shared/custom-input/custom-input";

@Component({
  selector: 'app-create-book-page',
  imports: [FormField, Button, CustomInput],
  templateUrl: './create-book-page.html',
  styleUrl: './create-book-page.scss',
})
export class CreateBookPage {
  bookService: BookService = inject(BookService);
  categoryOptions = Object.entries(BookCategory).map(([key, value]) => ({
    key,
    value,
  }));

  protected readonly model = signal<BookDTO>({
    title: '',
    author: '',
    category: '',
    coverUrl: '',
    description: '',
    isbn: '',
  });

  // TODO : Add validations
  protected readonly form = form(this.model, (schema) => {
    required(schema.title, { message: 'Le titre est obligatoire' });
    required(schema.author, { message: "L'auteur est obligatoire" });
    required(schema.isbn, { message: "L'ISBN est obligatoire" });
    required(schema.category, { message: 'Veuillez sélectionner une catégorie' });
  });

  protected onSubmit(): void {
    console.log('Form value :', this.form().value());
  }
}
