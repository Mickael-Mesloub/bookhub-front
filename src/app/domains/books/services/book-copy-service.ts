import { inject, Injectable } from '@angular/core';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { Observable } from 'rxjs';
import { BookCopy } from '../models/book-models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookCopyService {
  private readonly http = inject(HttpClient);
  
 getBookCopies(isbn: string): Observable<ApiResponse<BookCopy[]>> {
   return this.http.get<ApiResponse<BookCopy[]>>(`${API_BASE_URL}/books/copy/` + isbn);
 }

  checkAvailable(copies: BookCopy[] ): boolean {
    for(let copy of copies){
      if(copy.available){
        return true
      }
    }
    return false
  }
}
