import { Loan } from '../../loans/loan-models';

export enum UserRole {
  USER = 'USER',
  LIBRARIAN = 'LIBRARIAN',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  loans: Loan[];
}
