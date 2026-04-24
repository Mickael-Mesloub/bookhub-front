import { Component, inject, OnInit, signal } from '@angular/core';
import { SaveBookForm } from '../../../users/components/librarian/save-book-form/save-book-form';
import { AuthService } from '../../../users/services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book-models';
import { BookService } from '../../services/book-service';
import { ApiResponse } from '../../../../config/api/api';

@Component({
  selector: 'app-save-book-page',
  imports: [SaveBookForm],
  templateUrl: './save-book-page.html',
  styleUrl: './save-book-page.scss',
})
export class SaveBookPage implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly bookService: BookService = inject(BookService);
  private readonly route = inject(ActivatedRoute);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  book = signal<Book | undefined>(undefined);
  isbn = signal<string>('');
  pageTitle = signal<string>('');

  ngOnInit(): void {
    // TODO: call api
    this.isbn.set(this.route.snapshot.params['isbn']);
    this.pageTitle.set(
      this.activatedRoute.snapshot.routeConfig?.path === 'books/new'
        ? 'Ajouter un livre'
        : 'Modifier le livre',
    );

    if (this.isbn()) {
      this.fetchBook();
    }
  }

  fetchBook(): void {
    this.bookService.getBookDetail(this.isbn()).subscribe({
      next: (response: ApiResponse<Book>) => {
        console.log('API RESPONSE DANS SAVE BOOK PAGE ', response);

        this.book.set(response.data);
        console.log('BOOK SIGNAL ', this.book());
      },
      error: (err) => console.error('Failed to fetch book: ', err),
    });
  }
}
