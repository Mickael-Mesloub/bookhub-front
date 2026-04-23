import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../../../components/shared/button/button';
import { RegisterForm } from '../../models/auth-models';
import { NotificationService } from '../../../../components/shared/notification/service/notification-service';

@Component({
  selector: 'app-auth',
  imports: [RouterLink, ReactiveFormsModule, Button],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private readonly authService = inject(AuthService); // injecter mon service
  private readonly router = inject(Router); // injecter le router pour pouvoir gérer la navigation
  private readonly route = inject(ActivatedRoute); // Détecter la route
  private readonly notificationService = inject(NotificationService);

  readonly authForm = signal<FormGroup>(
    new FormGroup({
      username: new FormControl('', [Validators.required]), // mettre le tableau de validators
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      // Ajout conditionnel du champ email avec le spread operator
      ...(this.isLoginMode
        ? {}
        : {
            passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            firstname: new FormControl('', [Validators.required]),
            lastname: new FormControl('', [Validators.required]),
          }),
    }),
  );

  get isLoginMode() {
    return this.route.snapshot.routeConfig?.path === 'auth/login';
  }

  private login(data: RegisterForm) {
    this.authService.login(data.username, data.password).subscribe({
      next: (response) => {
        this.notificationService.show({type: 'alert-success', message: 'Connexion réussie' });
        // localStorage.setItem('token', response.token);
        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.notificationService.show({type: 'alert-error', message: 'Erreur de login' });
      },
    });
  }

  private register(data: RegisterForm) {
    this.authService.register(data).subscribe({
      next: () => {
        this.notificationService.show({type: 'alert-success', message: 'Compte créé avec succès'});
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.notificationService.show({type: 'alert-error', message: "Erreur lors de l'inscription"});
      },
    });
  }

  onSubmit(): void {
    if (!this.authForm().valid) return;
    const data = this.authForm().value;
    this.isLoginMode ? this.login(data) : this.register(data);
  }

  // permettra d'appeler {{ username }} = traité comme une propriété → plus propre et plus performant
  get username() {
    return this.authForm().get('username');
  }
  get email() {
    return this.authForm().get('email');
  }
  get passwordConfirmation() {
    return this.authForm().get('passwordConfirmation');
  }
  get password() {
    return this.authForm().get('password');
  }
  get firstname() {
    return this.authForm().get('firstname');
  }
  get lastname() {
    return this.authForm().get('lastname');
  }

  isInvalid(control: AbstractControl | null): boolean {
    return !!control && control.invalid && control.touched;
  }

  // initForm() {
  //   this.authForm.set(
  //     new FormGroup({
  //       username: new FormControl('', [Validators.required]),
  //       password: new FormControl('', [Validators.required, Validators.minLength(6)]),

  //       // Ajout conditionnel du champ email avec le spread operator
  //       ...(this.isLoginMode
  //         ? {}
  //         : {
  //       passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //             email: new FormControl('', [Validators.required, Validators.email]),
  //             firstname: new FormControl('', [Validators.required]),
  //             lastname: new FormControl('', [Validators.required]),
  //           }),
  //     }),
  //   );
  // }
}
