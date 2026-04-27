import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../users/services/auth-service';
import { NotificationService } from '../../../../components/shared/notification/service/notification-service';
import { Button } from '../../../../components/shared/button/button';
import { Router } from '@angular/router';
import { ReviewService } from '../../services/review-service';
import { Review, ReviewFormData } from '../../models/review-models';
import { CustomInput } from '../../../../components/shared/custom-input/custom-input';
import { form, FormField } from '@angular/forms/signals';
import { createReviewFormSchema, createReviewModel } from '../../models/review-form-model';
import { LoanService } from '../../../loans/services/loan-service';
import { ApiResponse, ApiErrorResponse } from '../../../../config/api/api';
import { Book } from '../../../books/models/book-models';
import { NgClass } from '@angular/common';
import { UserService } from '../../../users/services/user-service';

@Component({
  selector: 'app-review-form',
  imports: [Button, FormField, NgClass],
  templateUrl: './review-form.html',
  styleUrl: './review-form.scss',
})
export class ReviewForm {
  book: InputSignal<Book> = input.required<Book>();
  authService: AuthService = inject(AuthService);
  loanService: LoanService = inject(LoanService);
  userService: UserService = inject(UserService);
  readonly currentUser = this.authService.currentUser;
  readonly isAuthenticated = this.authService.isAuthenticated;
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly reviewService: ReviewService = inject(ReviewService);

  router: Router = inject(Router);

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  // Model for create book form
  model = signal<WritableSignal<ReviewFormData>>(createReviewModel());

  // Signal form with model (initial value) and schema (validation)
  form = form<ReviewFormData>(this.model(), (schema) => {
    createReviewFormSchema(schema);
  });

  protected onSubmit(): void {
    let reviewFormData: ReviewFormData = this.form().value();
    if (!this.isAuthenticated()) {
      this.goToLogin();
    }
    reviewFormData.username = this.userService.checkUsernameValid(this.currentUser()?.username);
    if (reviewFormData.username != '') {
      reviewFormData.bookISBN = this.book().isbn;
      this.reviewService.createReview(reviewFormData).subscribe({
        next: (response: ApiResponse<Review>) => {
          this.notificationService.openNotification({
            type: 'alert-success',
            message: response.message,
          });
        },
        error: (response: ApiErrorResponse) => {
          console.error('ERROR IN loanBook() : ', response);
          this.notificationService.openNotification({
            type: 'alert-error',
            message: response.error.message,
          });
        },
      });
    }
  }
}
