import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../../../components/shared/button/button';
import { LoanBook } from '../../../loans/components/loan-book/loan-book';
import { ReviewBook } from '../../../reviews/components/review-book/review-book';
import { AuthService } from '../../../users/services/auth-service';
import { BookDescription } from '../../components/book-description/book-description';
import { CreateBookCopyForm } from '../../components/create-book-copy-form/create-book-copy-form';
import { Book } from '../../models/book-models';
import { DeleteBookService } from '../../services/delete-book-service';
import { LimitedUserData } from '../../../users/models/auth-models';
import { UserRole } from '../../../users/models/user-models';

@Component({
  selector: 'app-book-detail',
  imports: [BookDescription, LoanBook, ReviewBook, Button, CreateBookCopyForm],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly authService: AuthService = inject(AuthService);
  private readonly deleteBookService: DeleteBookService = inject(DeleteBookService);

  readonly isAuthenticated: Signal<boolean> = this.authService.isAuthenticated;
  readonly currentUser: Signal<LimitedUserData | null> = this.authService.currentUser;
  roles = UserRole; 

  data = toSignal(this.route.data);

  // Get book data tahnks to resolver
  book: Signal<Book> = computed(() => this.data()?.['book'] as Book);

  goToEditBook(): void {
    this.router.navigateByUrl(`/books/${this.book().id}/update`);
  }

  // TODO : Add confirmation modal
  deleteBook(): void {
    this.deleteBookService.deleteBook(this.book().id);
  }
}
