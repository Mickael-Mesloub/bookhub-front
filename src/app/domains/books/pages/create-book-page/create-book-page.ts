import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { Button } from '../../../../components/shared/button/button';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import { ApiResponse } from '../../../../config/api/api';
import { AuthService } from '../../../users/services/auth-service';
import { createBookFormSchema, createBookModel } from '../../models/book-form-model';
import { Book, BookCategory } from '../../models/book-models';
import { BookService } from '../../services/book-service';
import { CreateBookService } from '../../services/create-book-service';

@Component({
  selector: 'app-create-book-page',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './create-book-page.html',
  styleUrl: './create-book-page.scss',
})
export class CreateBookPage implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly bookService: BookService = inject(BookService);
  private readonly createBookService: CreateBookService = inject(CreateBookService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  isbn = signal<string>('');
  pageTitle: WritableSignal<string> = signal('');
  isLoading: Signal<boolean> = computed(() => this.createBookService.isLoading());
  bookData = computed(() => this.createBookService.book());
  model = computed(() => createBookModel(this.bookData() ?? undefined));

  form = form(this.model(), (schema) => {
    createBookFormSchema(schema);
  });

  categoryOptions = Object.entries(BookCategory).map(([key, value]) => ({
    key,
    value,
  }));

  protected onSubmit(): void {
    this.createBookService.createBook(this.form().value());
  }

  ngOnInit(): void {
    const isNewBookRoute: boolean = this.activatedRoute.snapshot.routeConfig?.path === 'books/new';

    if (isNewBookRoute) {
      this.pageTitle.set('Ajouter un livre');
      this.createBookService.book.set(undefined);
    } else {
      this.pageTitle.set('Modifier le livre');
      this.isbn.set(this.route.snapshot.params['isbn']);

      if (this.isbn()) {
        this.fetchBook();
      }
    }

    this.createBookService.isLoading.set(false);
  }

  fetchBook(): void {
    this.bookService.getBookDetail(this.isbn()).subscribe({
      next: (response: ApiResponse<Book>) => {
        this.createBookService.book.set(response.data);
        console.log('FETCHBOOK SET BOOK ', this.createBookService.book()); // Ici, je récupère bien la data
      },
      error: (err) => {
        console.error('Failed to fetch book: ', err);
        this.createBookService.isLoading.set(false);
      },
    });
  }
}
