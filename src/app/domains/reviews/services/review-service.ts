import { inject, Injectable } from '@angular/core';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PageOfReviews } from '../models/review-models';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly http = inject(HttpClient);

  getReviews(isbn: string): Observable<ApiResponse<PageOfReviews>> {
     return this.http.get<ApiResponse<PageOfReviews>>(`${API_BASE_URL}/books/reviews?isbn=` + isbn);
   }
}
