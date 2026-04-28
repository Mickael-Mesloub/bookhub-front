import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { BookCopy } from '../../books/models/book-models';
import { BookCopyService } from '../../books/services/book-copy-service';
import { Loan, LoanDTO } from '../loan-models';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  bookCopyService: BookCopyService = inject(BookCopyService);
  constructor(private readonly http: HttpClient) {}

  checkAvailable(copies: BookCopy[]): boolean {
    return this.bookCopyService.checkAvailable(copies);
  }

  createLoan(loanDTO: LoanDTO): Observable<ApiResponse<Loan>> {
    return this.http.post<ApiResponse<Loan>>(`${API_BASE_URL}/books/loan`, loanDTO);
  }

  getAllOpenLoans(): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(
      `${API_BASE_URL}/dashboard/dashboardBiblioLoanOngoing`,
    );
  }
}
