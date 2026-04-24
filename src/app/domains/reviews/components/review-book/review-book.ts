import { Component, inject, input, InputSignal } from '@angular/core';
import { Book, Review } from '../../../books/models/book-models';
import { ReviewService } from '../../services/review-service';
import { ApiResponse } from '../../../../config/api/api';
import { PageOfReviews } from '../../models/review-models';

@Component({
  selector: 'app-review-book',
  imports: [],
  templateUrl: './review-book.html',
  styleUrl: './review-book.scss',
})
export class ReviewBook {
  book: InputSignal<Book> = input.required<Book>();
  
  reviewService: ReviewService = inject(ReviewService)
  bookReviews: Review[] = []

   ngOnInit(){
     this.fetchAllReviews(this.book().isbn)
     console.log(this.book().isbn)
   }

  fetchAllReviews(isbn: string): void {
    this.reviewService.getReviews(isbn).subscribe({
      next: (response: ApiResponse<PageOfReviews>) => {
        this.bookReviews = response.data.content
        console.log(response.data)
      },
      error: (err) => console.error('Failed to fetch copies: ', err),
    });
  }


}
