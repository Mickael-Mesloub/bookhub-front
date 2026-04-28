import { BookCopy } from '../books/models/book-models';
import { User } from '../users/models/user-models';

export interface Loan {
  id: number;
  dateLoaned: Date;
  dateReturned: Date;
  bookCopy: BookCopy;
  user: User;
}

export interface LoanDTO {
  username: string;
  isbn: string;
}
