import { BookCopy } from '../books/book-models';
import { User } from '../users/user-models';

export interface Loan {
  id: number;
  dateLoaned: Date;
  dateReturned: Date;
  copyId: BookCopy['id'];
  userId: User['id'];
}
