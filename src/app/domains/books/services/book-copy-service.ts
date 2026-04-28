import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { BookCopy } from '../models/book-models';
import { BookCopyFormData } from '../models/book-copy-form-model';

@Injectable({
  providedIn: 'root',
})
export class BookCopyService {
  private readonly http = inject(HttpClient);

  getBookCopies(isbn: string): Observable<ApiResponse<BookCopy[]>> {
    return this.http.get<ApiResponse<BookCopy[]>>(`${API_BASE_URL}/books/copy/` + isbn);
  }

  checkAvailable(copies: BookCopy[]): boolean {
    for (let copy of copies) {
      if (copy.available) {
        return true;
      }
    }
    return false;
  }

  createBookCopy(bookId: number, bookCopyFormData: BookCopyFormData): Observable<ApiResponse<BookCopy>> {
    return this.http.post<ApiResponse<BookCopy>>(`${API_BASE_URL}/books/copy/${bookId}/new-copy`, bookCopyFormData);
  }
}
