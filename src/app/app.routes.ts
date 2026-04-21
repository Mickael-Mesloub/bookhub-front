import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./domains/books/books.routes').then((c) => c.BOOK_ROUTES) },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
