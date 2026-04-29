import { Book } from '../../books/models/book-models';
import { Loan } from '../../loans/loan-models';

export enum UserRole {
  USER,
  LIBRARIAN,
  ADMIN,
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
  lateLoans: Loan[];
  openLoans: Loan[];
  mostRead: Book[];
}
