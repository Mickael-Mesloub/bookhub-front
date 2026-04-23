import { Loan } from '../loans/loan-models';

export enum UserRole {
    USER,
    LIBRARIAN,
    ADMIN
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
