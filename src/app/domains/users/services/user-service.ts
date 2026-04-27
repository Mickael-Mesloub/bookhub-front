import { inject, Injectable } from '@angular/core';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { Book } from '../../books/models/book-models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  checkUsernameValid(username: string | undefined): string {
    if (username != undefined) {
      return username;
    }
    return '';
  }

  getAllLoanedBooksByUser(username: string): Observable<ApiResponse<Book[]>> {
    return this.http.get<ApiResponse<Book[]>>(
      `${API_BASE_URL}/dashboard/loaned?username=` + username,
    );
  }
}
