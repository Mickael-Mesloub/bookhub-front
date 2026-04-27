import { inject, Injectable, input, InputSignal } from '@angular/core';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PageOfReviews, Review, ReviewFormData } from '../models/review-models';
import { AuthService } from '../../users/services/auth-service';
import { Router } from '@angular/router';
import { LoanService } from '../../loans/services/loan-service';
import { Book } from '../../books/models/book-models';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  authService: AuthService = inject(AuthService);
  loanService: LoanService = inject(LoanService);
  router: Router = inject(Router);
  private readonly http = inject(HttpClient);

  getReviews(isbn: string, currentPage?: number): Observable<ApiResponse<PageOfReviews>> {
    let response: string = '';
    if (currentPage) {
      response = '&page=' + currentPage;
    }
    return this.http.get<ApiResponse<PageOfReviews>>(
      `${API_BASE_URL}/books/reviews?isbn=` + isbn + response,
    );
  }

  createReview(reviewFormData: ReviewFormData): Observable<ApiResponse<Review>> {
    // TODO: faire tout ça avec un token (un jour)

    return this.http.post<ApiResponse<Review>>(`${API_BASE_URL}/books/review`, reviewFormData);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
