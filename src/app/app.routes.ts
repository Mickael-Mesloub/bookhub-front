import { Routes } from '@angular/router';
import { Auth } from './domains/users/pages/auth/auth';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./domains/books/books.routes').then((c) => c.BOOK_ROUTES), },
  { path: 'auth/signup', component: Auth },
  { path: 'auth/login', component: Auth },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
