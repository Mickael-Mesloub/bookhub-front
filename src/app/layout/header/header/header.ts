import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../domains/users/services/auth-service';
import { RegisterForm } from '../../../domains/users/models/auth-models';
import { NotificationService } from '../../../components/shared/notification/service/notification-service';

type HeaderLink = {
  label: string;
  path: string;
  exact?: boolean;
  restricted: boolean;
  isAuthenticated: boolean;
};

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router); // injecter le router pour pouvoir gérer la navigation

  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;

  links: HeaderLink[] = [
    { label: 'Catalogue', path: '/', exact: true, restricted: false, isAuthenticated: false },
    {
      label: "S'inscrire",
      path: '/auth/signup',
      exact: true,
      restricted: true,
      isAuthenticated: false,
    },
    {
      label: 'Se connecter',
      path: '/auth/login',
      exact: true,
      restricted: true,
      isAuthenticated: false,
    },
    {
      label: 'Mon profil',
      path: '/profile',
      exact: true,
      restricted: true,
      isAuthenticated: true
    },
    {
      label: 'Se déconnecter',
      path: '/auth/logout',
      exact: true,
      restricted: true,
      isAuthenticated: true,
    },

    // TODO : Restreindre la route /dashboard
    { label: 'Dashboard', path: '/dashboard', restricted: false, isAuthenticated: false },
    
    // TODO : Supprimer la route /books/new
    { label: 'Save book', path: '/books/new', restricted: false, isAuthenticated: false },
  ];

  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  logout() {
    const success = this.authService.logout();
    this.notificationService.show({
      type: success ? 'alert-success' : 'alert-info',
      message: success ? 'Déconnexion réussie' : 'Aucun utilisateur connecté',
    });
    if (success) {
      this.router.navigate(['/']);
    }
  }
}
