import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, ApiResponse } from '../../../config/api/api';
import { HttpClient } from '@angular/common/http';
import { ReservationDto, ReservationListDto } from '../models/reservation-models';
import { AuthService } from '../../users/services/auth-service';
import { Book } from '../../books/models/book-models';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly http = inject(HttpClient);

  addReservation(idBookToResa: number, idUser: number): Observable<ApiResponse<ReservationDto>> {
    return this.http.post<ApiResponse<ReservationDto>>(
      `${API_BASE_URL}/reservations`,
      { bookId: idBookToResa, userId: idUser });
  }

  // getReservationListOfCurrentUser(): Observable<ApiResponse<ReservationListDto>> {
  //   return this.http.get<ApiResponse<ReservationListDto>>(`${API_BASE_URL}/reservations/my`);
  // }
  //
  // cancelReservation(resaId: number): Observable<ApiResponse<ReservationDto>> {
  //   return this.http.post<ApiResponse<ReservationDto>>(`${API_BASE_URL}/reservations`, resaId);
  // }
}
