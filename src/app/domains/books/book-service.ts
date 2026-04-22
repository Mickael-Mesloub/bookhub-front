import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, ApiResponse } from '../../config/api/api';
import { Book } from './book-models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly http = inject(HttpClient);

  getAllBooks(): Observable<ApiResponse<Book[]>> {
    return this.http.get<ApiResponse<Book[]>>(`${API_BASE_URL}/books`);
  }
}
