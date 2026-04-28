import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { ApiResponse } from '../../../config/api/api';
import { User } from '../../users/models/user-models';
import { UserService } from '../../users/services/user-service';
import { Loan } from '../loan-models';
import { LoanService } from '../services/loan-service';

export interface LoanReturnResolverData {
  users: User[];
  openedLoans: Loan[];
}

export const loanReturnResolver: ResolveFn<LoanReturnResolverData> = (
  route: ActivatedRouteSnapshot,
) => {
  const userService = inject(UserService);
  const loanService = inject(LoanService);

  return forkJoin({
    users: userService.getAllUsers().pipe(
      map((response: ApiResponse<User[]>) => {
        return response.data;
      }),
    ),
    openedLoans: loanService
      .getAllOpenLoans()
      .pipe(map((response: ApiResponse<Loan[]>) => response.data)),
  });
};
