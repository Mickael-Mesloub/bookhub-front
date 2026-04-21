import { Routes } from '@angular/router';
import { Test } from './domains/test/test';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./domains/books/books.routes').then((c) => c.BOOK_ROUTES) },
    { path: 'test', component: Test },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
