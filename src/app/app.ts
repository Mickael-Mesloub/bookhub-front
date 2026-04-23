import { Component, inject } from '@angular/core';
import { AppLayout } from './layout/app-layout/app-layout/app-layout';
import { AuthService } from './domains/users/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [AppLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  private readonly authService = inject(AuthService); // injecter mon service

  clickBtn(): void {
    console.log('Button clicked!');
  }

  ngOnInit() {
    this.authService.loadCurrentUser();
  }
}
