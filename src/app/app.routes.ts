import { Routes } from '@angular/router';
import { Auth } from './domains/users/pages/auth/auth';
import { Dashboard } from './domains/users/pages/dashboard/dashboard';
import { EditProfile } from './domains/users/pages/edit-profile/edit-profile';
import { LoanReturnPage } from './domains/loans/pages/loan-return-page/loan-return-page';
import { loanReturnResolver } from './domains/loans/resolvers/loan-return-resolver';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./domains/books/books.routes').then((c) => c.BOOK_ROUTES),
  },
  { path: 'auth/signup', component: Auth },
  { path: 'auth/login', component: Auth },
  { path: 'auth/logout', component: Auth },
  { path: 'dashboard', component: Dashboard },
  { path: 'auth/profile/edit', component: EditProfile },
  { path: 'loans/return', component: LoanReturnPage, resolve: { data: loanReturnResolver } },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
