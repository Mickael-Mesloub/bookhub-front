import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-dashboard-user',
  imports: [],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.scss',
})
export class DashboardUser {
  private readonly authService = inject(AuthService);
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;
}
