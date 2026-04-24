import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  effect,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SaveBookForm } from '../../components/save-book-form/save-book-form';
import { AuthService } from '../../../users/services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BookCategory } from '../../models/book-models';
import { BookService } from '../../services/book-service';
import { ApiResponse } from '../../../../config/api/api';
import { SaveBookService } from '../../services/save-book-service';
import { saveBookFormSchema, saveBookModel } from '../../models/book-form-model';
import { form, FormField } from '@angular/forms/signals';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import { NgClass } from '@angular/common';
import { Button } from '../../../../components/shared/button/button';

@Component({
  selector: 'app-save-book-page',
  imports: [FormField, Button, CustomInput, NgClass],
  templateUrl: './save-book-page.html',
  styleUrl: './save-book-page.scss',
})
export class SaveBookPage implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly bookService: BookService = inject(BookService);
  private readonly saveBookService: SaveBookService = inject(SaveBookService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  isbn = signal<string>('');
  pageTitle: WritableSignal<string> = signal('');
  isLoading: Signal<boolean> = computed(() => this.saveBookService.isLoading());
  bookData = computed(() => this.saveBookService.book());
  model = computed(() => saveBookModel(this.bookData() ?? undefined));

  form = form(this.model(), (schema) => {
    saveBookFormSchema(schema);
  });

  categoryOptions = Object.entries(BookCategory).map(([key, value]) => ({
    key,
    value,
  }));

  protected onSubmit(): void {
    this.saveBookService.saveBook(this.form().value());
  }

  ngOnInit(): void {
    const isNewBookRoute: boolean = this.activatedRoute.snapshot.routeConfig?.path === 'books/new';

    if (isNewBookRoute) {
      this.pageTitle.set('Ajouter un livre');
      this.saveBookService.book.set(undefined);
    } else {
      this.pageTitle.set('Modifier le livre');
      this.isbn.set(this.route.snapshot.params['isbn']);

      if (this.isbn()) {
        this.fetchBook();
      }
    }

    this.saveBookService.isLoading.set(false);
  }

  fetchBook(): void {
    this.bookService.getBookDetail(this.isbn()).subscribe({
      next: (response: ApiResponse<Book>) => {
        this.saveBookService.book.set(response.data);
        console.log('FETCHBOOK SET BOOK ', this.saveBookService.book()); // Ici, je récupère bien la data
      },
      error: (err) => {
        console.error('Failed to fetch book: ', err);
        this.saveBookService.isLoading.set(false);
      },
    });
  }
}
