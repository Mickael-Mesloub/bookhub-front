import { Component, inject, input, InputSignal } from '@angular/core';
import { Book } from '../../../books/models/book-models';
import { ReviewService } from '../../services/review-service';
import { ApiResponse } from '../../../../config/api/api';
import { PageOfReviews, Review } from '../../models/review-models';
import { ReviewCard } from '../review-card/review-card';
import { ReviewForm } from '../review-form/review-form';

@Component({
  selector: 'app-review-book',
  imports: [ReviewCard, ReviewForm],
  templateUrl: './review-book.html',
  styleUrl: './review-book.scss',
})
export class ReviewBook {
  book: InputSignal<Book> = input.required<Book>();

  reviewService: ReviewService = inject(ReviewService);
  reviewPage!: PageOfReviews;
  currentPage: number = 0;

  ngOnInit() {
    this.fetchAllReviews(this.book().isbn);
  }

  fetchAllReviews(isbn: string, page?: number): void {
    this.reviewService.getReviews(isbn).subscribe({
      next: (response: ApiResponse<PageOfReviews>) => {
        this.reviewPage = response.data;
      },
      error: (err) => console.error('Failed to fetch copies: ', err),
    });
  }

  nextPage(): void {
    if (this.currentPage < this.reviewPage.totalPages) {
      this.currentPage++;
      this.fetchAllReviews(this.book().isbn, this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchAllReviews(this.book().isbn, this.currentPage);
    }
  }
}
