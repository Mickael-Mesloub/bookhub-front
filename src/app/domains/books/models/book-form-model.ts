import { signal, WritableSignal } from '@angular/core';
import { maxLength, minLength, required, SchemaPathTree } from '@angular/forms/signals';
import { Book, BookCategory } from './book-models';

// ********** VALIDATION RULES ********** \\
const TITLE_MIN_LENGTH: number = 4;
const TITLE_MAX_LENGTH: number = 100;

const AUTHOR_MIN_LENGTH: number = 2;
const AUTHOR_MAX_LENGTH: number = 100;

const ISBN_MIN_LENGTH: number = 10;
const ISBN_MAX_LENGTH: number = 13;

// ********** TYPE FOR BOOK FORM DATA ********** \\
export type CreateBookFormData = Pick<Book, 'title' | 'author' | 'description' | 'isbn'> & {
  category: BookCategory | '';
};

// ********** MODEL ********** \\
export function createBookModel(): WritableSignal<CreateBookFormData> {
  return signal<CreateBookFormData>({
    title: '',
    author: '',
    category: '',
    description: '',
    isbn: '',
  });
}

// ********** SCHEMA FOR FORM VALIDATION ********** \\
export function createBookFormSchema(schema: SchemaPathTree<CreateBookFormData>) {
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
