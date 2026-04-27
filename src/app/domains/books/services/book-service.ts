import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { BookCategoryOption, BookFormData } from '../models/book-form-model';
import { Book, BookCategory, BookCategoryOptionLabels, PageOfBooks } from '../models/book-models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly http = inject(HttpClient);

  // Labels for category select options
  BookCategoryOptionLabels: Record<BookCategory, string> = BookCategoryOptionLabels;

  // List of category options (label and value) for select input
  categoryOptions: BookCategoryOption[] = Object.entries(BookCategory).map(([_, value]) => ({
    key: BookCategoryOptionLabels[value],
    value,
  }));

  // Autre possibilité : HttpParams permet de construire des URLs en Angular — il gère l'encodage et le formatage automatiquement

  // Rôle : construire l'URL et faire la requête HTTP
  getAllBooks(
    page?: number,
    size?: number,
    sort?: string,
    search?: string,
    categories?: string[],
    availability?: string,
  ): Observable<ApiResponse<PageOfBooks>> {
    let response: string = '';
    if (page != null) {
      // != null car sinon page=0 ne rentrera pas dans la condition
      if (response == '') {
        response += '?page=' + page;
      } else {
        response += '&page=' + page;
      }
    }
    if (size) {
      if (response == '') {
        response += '?size=' + size;
      } else {
        response += '&size=' + size;
      }
    }
    if (sort) {
      if (response == '') {
        response += '?sort=' + sort;
      } else {
        response += '&sort=' + sort;
      }
    }
    if (search) {
      if (response == '') {
        response += '?search=' + search;
      } else {
        response += '&search=' + search;
      }
    }
    // & Spring voit plusieurs paramètres avec le même nom et les regroupe automatiquement dans la liste :
    if (categories !== null && categories !== undefined && !categories?.includes('ALL')) {
      for (const cat of categories) {
        if (response == '') {
          response += '?categories=' + cat;
        } else {
          response += '&categories=' + cat;
        }
      }
    }
    if (availability !== null && availability !== undefined && availability !== 'ALL') {
      if (response == '') {
        response += '?availability=' + availability;
      } else {
        response += '&availability=' + availability;
      }
    }

    return this.http.get<ApiResponse<PageOfBooks>>(`${API_BASE_URL}/books${response}`);
  }

  getBookDetail(isbn: string): Observable<ApiResponse<Book>> {
    return this.http.get<ApiResponse<Book>>(`${API_BASE_URL}/books/${isbn}`);
  }

  getBookById(id: number): Observable<ApiResponse<Book>> {
    return this.http.get<ApiResponse<Book>>(`${API_BASE_URL}/books/id/${id.toString()}`);
  }

  createBook(createBookFormData: BookFormData): Observable<ApiResponse<Book>> {
    return this.http.post<ApiResponse<Book>>(`${API_BASE_URL}/books/new`, createBookFormData);
  }

  updateBook(id: number, updateBookFormData: BookFormData): Observable<ApiResponse<Book>> {
    return this.http.put<ApiResponse<Book>>(
      `${API_BASE_URL}/books/${id.toString()}/update`,
      updateBookFormData,
    );
  }

  deleteBook(id: number): Observable<ApiResponse<Book>> {
    return this.http.delete<ApiResponse<Book>>(`${API_BASE_URL}/books/${id.toString()}/delete`);
  }
}
