import { Routes } from '@angular/router';

export const BOOK_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./catalog/catalog').then((c) => c.Catalog) },
];
