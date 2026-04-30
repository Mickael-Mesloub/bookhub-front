import { BookCopy } from '../books/models/book-models';
import { LimitedUserData } from '../users/models/auth-models';

export interface Loan {
  id: number;
  dateLoaned: Date;
  dateReturned: Date;
  bookcopy: BookCopy;
  user: LimitedUserData;
}

export interface LoanDTO {
  username: string;
  isbn: string;
}

export interface LoanReturnDTO {
  loan: Loan,
  bookcopy: BookCopy
}
