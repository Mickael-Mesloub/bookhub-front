import { Routes } from '@angular/router';
import { UpdateBookPage } from './pages/update-book-page/update-book-page';
import { bookResolver } from './resolvers/bookResolver';

export const BOOK_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/catalog/catalog').then((c) => c.Catalog) },
  {
    path: 'detail/:isbn',
    loadComponent: () => import('./pages/book-detail/book-detail').then((c) => c.BookDetail),
  },
  {
    path: 'books/new',
    loadComponent: () =>
      import('./pages/create-book-page/create-book-page').then((c) => c.CreateBookPage),
  },
  {
    path: 'books/:id/update',
    component: UpdateBookPage,
    resolve: {
      book: bookResolver,
    },
  },
];
