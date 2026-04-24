import { signal, WritableSignal } from '@angular/core';
import { Book, BookCategory } from './book-models';
import { maxLength, minLength, required, SchemaPathTree } from '@angular/forms/signals';

// ********** VALIDATION RULES ********** \\
const TITLE_MIN_LENGTH: number = 4;
const TITLE_MAX_LENGTH: number = 100;

const AUTHOR_MIN_LENGTH: number = 2;
const AUTHOR_MAX_LENGTH: number = 100;

const ISBN_MIN_LENGTH: number = 10;
const ISBN_MAX_LENGTH: number = 13;

// ********** TYPE FOR BOOK FORM DATA ********** \\
export type BookFormData = Pick<Book, 'title' | 'author' | 'description' | 'isbn'> & {
  category: BookCategory | '';
};

// ********** MODEL ********** \\
export function saveBookModel(book?: Book): WritableSignal<BookFormData> {
  console.log('BOOK DANS SAVE BOOK MODEL', book);

  return signal<BookFormData>({
    title: book?.title ?? '',
    author: book?.author ?? '',
    category: book?.category.category ?? '',
    description: book?.description ?? '',
    isbn: book?.isbn ?? '',
  });
}

// ********** SCHEMA FOR FORM VALIDATION ********** \\
export function saveBookFormSchema(schema: SchemaPathTree<BookFormData>) {
  required(schema.title, { message: 'Le titre est obligatoire' });
  minLength(schema.title, TITLE_MIN_LENGTH, {
    message: `Le titre doit contenir ${TITLE_MIN_LENGTH} caractères minimum`,
  });
  maxLength(schema.title, TITLE_MAX_LENGTH, {
    message: `Le titre doit contenir ${TITLE_MAX_LENGTH} caractères maximum`,
  });

  required(schema.author, { message: "L'auteur est obligatoire" });
  minLength(schema.author, AUTHOR_MIN_LENGTH, {
    message: `Le nom de l'auteur doit contenir ${AUTHOR_MIN_LENGTH} caractères minimum`,
  });
  maxLength(schema.author, AUTHOR_MAX_LENGTH, {
    message: `Le nom de l'auteur doit contenir ${AUTHOR_MAX_LENGTH} caractères minimum`,
  });

  required(schema.isbn, { message: "L'ISBN est obligatoire" });
  minLength(schema.isbn, ISBN_MIN_LENGTH, {
    message: `L'ISBN doit contenir ${ISBN_MIN_LENGTH} caractères minimum`,
  });
  maxLength(schema.isbn, ISBN_MAX_LENGTH, {
    message: `L'ISBN doit contenir ${ISBN_MAX_LENGTH} caractères minimum`,
  });

  required(schema.category, { message: 'Veuillez sélectionner une catégorie' });
}
