import { Injectable, signal, computed, WritableSignal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser, LoginResponse, RegisterForm } from '../models/auth-models';
import { API_BASE_URL, ApiResponse } from '../../../../config/api/api';
import { Observable } from 'rxjs';

// stockage token dans le local storage (en session c'est perdu à la fermeture de page)
// pour des raisons d'ergo on peut choisir de stocker le username et password dans un cookie
// interroger le back pour récupérer les infos utilisateurs lié à ce token csrf

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private tokenSignal = signal<string | null>(null);
  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  private user = signal<AuthUser | null>(null);
  readonly currentUser = this.user.asReadonly();

  login(username: string, password: string) {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${API_BASE_URL}/auth/login`,
      { username, password }
    );
  }

  setSession(token: string) {
    localStorage.setItem('token', token);
    this.tokenSignal.set(token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSignal.set(null);
  }

  // le backend ne doit pas renvoyer le password
  register(user: RegisterForm): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(
      `${API_BASE_URL}/auth/register`,
      user);
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.tokenSignal.set(token);
    this.http.get<AuthUser>(`${API_BASE_URL}/auth/me`)
      .subscribe(user => this.user.set(user));
  }
}
