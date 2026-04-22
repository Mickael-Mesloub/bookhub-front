import { Routes } from '@angular/router';

export const BOOK_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./catalog/catalog').then((c) => c.Catalog) },
  { path: 'books/new', loadComponent: () => import('./pages/create-book-page/create-book-page').then((c) => c.CreateBookPage) },
];
