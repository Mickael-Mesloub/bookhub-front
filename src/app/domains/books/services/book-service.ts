import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { Book, PageOfBooks } from '../models/book-models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly http = inject(HttpClient);

  getAllBooks(page?: number, size?: number, sort?: string): Observable<ApiResponse<PageOfBooks>> {
    let response: string = ""
    if(page){
      if(response == ""){
        response += '?page=' + page
      }
      else{
        response += '&page=' + page
      }
    }
    if(size){
      if(response == ""){
        response += '?size=' + size
      }
      else{
        response += '&size=' + size
      }
    }
    if(sort){
      if(response == ""){
        response += '?sort=' + sort
      }
      else{
        response += '&sort=' + sort
      }
    }

    return this.http.get<ApiResponse<PageOfBooks>>(`${API_BASE_URL}/books` + response);
  }

 getBookDetail(isbn: string): Observable<ApiResponse<Book>> {
   return this.http.get<ApiResponse<Book>>(`${API_BASE_URL}/books` + "/" + isbn);
 }
}
