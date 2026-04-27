import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { HttpClient } from '@angular/common/http';
import { ReservationDto, ReservationListDto } from '../models/reservation-models';
import { AuthService } from '../../users/services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly http = inject(HttpClient);

  addToWishlist(id: number): Observable<ApiResponse<ReservationDto>> {
    return this.http.post<ApiResponse<ReservationDto>>(`${API_BASE_URL}/reservations`, id);
  }

  getWishListOfCurrentUser(): Observable<ApiResponse<ReservationListDto>> {
    return this.http.get<ApiResponse<ReservationListDto>>(`${API_BASE_URL}/reservations/my`);
  }
}
