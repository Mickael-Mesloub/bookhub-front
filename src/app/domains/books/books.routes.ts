import { Routes } from '@angular/router';
import { UpdateBookPage } from './pages/update-book-page/update-book-page';
import { bookResolver } from './resolvers/bookResolver';
import { BookDetail } from './pages/book-detail/book-detail';

export const BOOK_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/catalog/catalog').then((c) => c.Catalog) },
  {
    path: 'detail/:id',
    component: BookDetail,
    resolve: {
      book: bookResolver,
    },
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
