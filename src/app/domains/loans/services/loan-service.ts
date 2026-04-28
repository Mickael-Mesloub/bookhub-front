import { inject, Injectable } from '@angular/core';
import { Book, BookCopy } from '../../books/models/book-models';
import { BookCopyService } from '../../books/services/book-copy-service';
import { Loan, LoanDTO } from '../loan-models';
import { Observable } from 'rxjs';
import { ApiResponse, API_BASE_URL } from '../../../config/api/api';
import { HttpClient } from '@angular/common/http';

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

  // TODO: add correct api calls
  getAllOpenLoans(userID: number): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(
      `${API_BASE_URL}/dashboard/dashboardUserLoanOngoing?userID=` + userID,
    );
  }

  getAllLateLoans(userID: number): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(
      `${API_BASE_URL}/dashboard/dashboardUserLoanRetards?userID=` + userID,
    );
  }

  getAllLoans(userID: number): Observable<ApiResponse<Loan[]>> {
    return this.http.get<ApiResponse<Loan[]>>(
      `${API_BASE_URL}/dashboard/dashboardUserBookReadByUser?userID=` + userID,
    );
  }
}
