import { signal, WritableSignal } from '@angular/core';
import { BookCopy, BookState } from './book-models';
import { required, SchemaPathTree } from '@angular/forms/signals';

export type BookCopyStateOption = {
  key: string;
  value: BookState;
};

export interface BookCopyFormData {
  state: BookState;
}

export function createBookCopyModel(): WritableSignal<BookCopyFormData> {
  return signal<BookCopyFormData>({
    state: BookState['NEW'],
  });
}

export function updateBookCopyModel(bookCopy: BookCopy | undefined): WritableSignal<BookCopyFormData> {
  return signal<BookCopyFormData>({
    state: bookCopy?.state ?? BookState.NEW,
  });
}

export function createBookCopyFormSchema(schema: SchemaPathTree<BookCopyFormData>) {
  required(schema.state, { message: 'Veuillez sélectionner un état' });
}