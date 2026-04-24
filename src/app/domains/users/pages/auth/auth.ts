import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
    new FormGroup(
      {
        ...(this.isLoginMode
          ? {
              username: new FormControl('', [Validators.required]),
              password: new FormControl('', [Validators.required]),
            }
          : {
              username: new FormControl('', [Validators.required, Validators.minLength(3)]),
              password: new FormControl('', [
                Validators.required,
                Validators.minLength(12),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/),
              ]),
            }),
        // Ajout conditionnel du champ email avec le spread operator
        ...(this.isLoginMode
          ? {}
          : {
              passwordConfirmation: new FormControl('', [
                Validators.required,
                Validators.minLength(12),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/),
              ]),
              email: new FormControl('', [Validators.required, Validators.email]),
              firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
              lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
            }),
      },
      // call the custom validator
      this.isLoginMode ? {} : { validators: this.passwordMatchValidator() },
    ),
  );

  passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmation = group.get('passwordConfirmation')?.value;

      return (password || confirmation) && password !== confirmation
        ? { passwordMismatch: true }
        : null;
    };
  }

  get isLoginMode() {
    return this.route.snapshot.routeConfig?.path === 'auth/login';
  }

  private login(data: RegisterForm) {
    this.authService.login(data.username, data.password).subscribe({
      next: (response) => {
        this.notificationService.show({
          type: 'alert-success',
          message: 'Connexion réussie',
        });
        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.notificationService.show({
          type: 'alert-error',
          message: 'Erreur de login',
        });
      },
    });
  }

  private register(data: RegisterForm) {
    this.authService.register(data).subscribe({
      next: () => {
        this.notificationService.show({
          type: 'alert-success',
          message: 'Compte créé avec succès',
        });
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.notificationService.show({
          type: 'alert-error',
          message: "Erreur lors de l'inscription",
        });
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

  isLowerCaseValid(control: AbstractControl | null): boolean {
    return /[a-z]/.test(control?.value); // Vérifie s'il y a au moins une lettre minuscule
  }

  isUpperCaseValid(control: AbstractControl | null): boolean {
    return /[A-Z]/.test(control?.value); // Vérifie s'il y a au moins une lettre majuscule
  }

  isDigitValid(control: AbstractControl | null): boolean {
    return /\d/.test(control?.value); // Vérifie s'il y a au moins un chiffre
  }

  isSpecialCharValid(control: AbstractControl | null): boolean {
    return /[^A-Za-z\d]/.test(control?.value); // Vérifie s'il y a au moins un caractère spécial
  }

  isMinLengthValid(control: AbstractControl | null): boolean {
    return /^.{12,}$/.test(control?.value || '');
  }

  isPasswordMatch(): boolean {
    return !this.authForm().hasError('passwordMismatch');
  }
}
