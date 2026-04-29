import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { BookCopy } from '../../books/models/book-models';
import { BookCopyService } from '../../books/services/book-copy-service';
import { Loan, LoanDTO, LoanReturnDTO } from '../loan-models';

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

  getAllOpenLoansByUser(userID: number): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(
      `${API_BASE_URL}/dashboard/dashboardUserLoanOngoing?userId=` + userID,
    );
  }

  getAllLateLoansByUser(userID: number): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(
      `${API_BASE_URL}/dashboard/dashboardUserLoanRetards?userId=` + userID,
    );
  }

  getAllLoansByUser(userID: number): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(
      `${API_BASE_URL}/dashboard/dashboardUserBookReadByUser?userId=` + userID,
    );
  }

  getAllLateLoans(): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(
      `${API_BASE_URL}/dashboard/dashboardBiblioLoanRetards`,
    );
  }

  getAllOpenLoans(): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(
      `${API_BASE_URL}/dashboard/dashboardBiblioLoanOngoing`,
    );
  }

  returnBook(loanReturnDTO: LoanReturnDTO):  Observable<ApiResponse<Loan>> {
    return this.http.post<ApiResponse<Loan>>(`${API_BASE_URL}/loans/return`, loanReturnDTO);
  }
}
