import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../../../components/shared/button/button';
import { LoanBook } from '../../../loans/components/loan-book/loan-book';
import { ReviewBook } from '../../../reviews/components/review-book/review-book';
import { BookDescription } from '../../components/book-description/book-description';
import { Book } from '../../models/book-models';

@Component({
  selector: 'app-book-detail',
  imports: [BookDescription, LoanBook, ReviewBook, Button],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {
  private readonly router: Router = inject(Router);
  book!: Book;

  constructor(activatedRoute: ActivatedRoute) {
    this.book = this.router.currentNavigation()?.extras.state as Book;
  }

  goToEditBook(): void {
    this.router.navigateByUrl(`/books/${this.book.id}/update`);
  }
}
