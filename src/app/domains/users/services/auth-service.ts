import { Injectable, signal, computed, WritableSignal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LimitedUserData, LoginResponse, RegisterForm } from '../models/auth-models';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { Observable, tap } from 'rxjs';

// stockage token dans le local storage (en session c'est perdu à la fermeture de page)
// pour des raisons d'ergo on peut choisir de stocker le username et password dans un cookie
// interroger le back pour récupérer les infos utilisateurs lié à ce token csrf

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  //private tokenSignal = signal<string | null>(null);
  //readonly isAuthenticated = computed(() => !!this.tokenSignal());

  private currUser = signal<LimitedUserData | null>(null);
  readonly isAuthenticated = computed(() => !!this.currUser());
  readonly currentUser = this.currUser.asReadonly();

  login(username: string, password: string) {
    return this.http
      .post<ApiResponse<LimitedUserData>>(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          this.currUser.set(response.data);
          // optionnel (persistance)
          //localStorage.setItem('user', JSON.stringify(user));
        }),
      );
  }

  // setSession(token: string) {
  //   localStorage.setItem('token', token);
  //   this.tokenSignal.set(token);
  // }

  logout(): boolean {
    if (!this.currUser()) return false;
    this.currUser.set(null);
    return true;
  }

  // le backend ne doit pas renvoyer le password
  register(user: RegisterForm): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${API_BASE_URL}/auth/register`, user);
  }

  // loadCurrentUser() {
  //   const token = localStorage.getItem('token');
  //   if (!token) return;
  //   this.tokenSignal.set(token);
  //   this.http.get<AuthUser>(`${API_BASE_URL}/auth/me`).subscribe((user) => this.user.set(user));
  // }
}
