import { Routes } from '@angular/router';

export const BOOK_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./catalog/catalog').then((c) => c.Catalog) },
  { path: 'detail', loadComponent: () => import('./book-detail/book-detail').then((c) => c.BookDetail)}
  // TODO: AJOUTER /:isbn au détail
];
