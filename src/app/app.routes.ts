import { Routes } from '@angular/router';
import { Test } from './domains/test/test';
import { Auth } from './domains/users/auth/auth';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./domains/books/books.routes').then((c) => c.BOOK_ROUTES), },
  { path: 'auth/signup', component: Auth },
  { path: 'auth/login', component: Auth },
  { path: 'test', component: Test },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
