import { Book } from '../../books/models/book-models';
import { Loan } from '../../loans/loan-models';
import { LimitedUserData } from './auth-models';

export enum UserRole {
  USER = 'USER',
  LIBRARIAN = 'LIBRARIAN',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role: UserRole;
  loans: Loan[];
}

export interface DashboardDTO {
  bookCount: number;
  lateLoans: DashboardLoanDTO[];
  openLoans: DashboardLoanDTO[];
  mostRead: Book[];
}

export interface DashboardLoanDTO {
  dateLoaned: Date;
  bookTitle: string;
  user: LimitedUserData;
}
