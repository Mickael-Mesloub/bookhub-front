import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../users/services/auth-service';
import { ReservationDto, ReservationListDto } from './models/reservation-models';
import { ReservationService } from './services/reservation-service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reservations',
  imports: [],
  templateUrl: './reservations.html',
  styleUrl: './reservations.scss',
})
export class Reservations {
  private readonly authService = inject(AuthService);
  private readonly resaService = inject(ReservationService);

  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser = this.authService.currentUser;

  protected reservationList: WritableSignal<ReservationListDto | null> = signal(null);

  // Au chargement du composant, appelle l’API.
  // Quand la réponse arrive, stocke les données dans un signal pour mettre à jour l’interface.”
  // ngOnInit() {
  //   this.resaService.getReservationListOfCurrentUser()
  //     .pipe(takeUntilDestroyed()).subscribe((response) => {
  //     this.reservationList.set(response.data);
  //   });
  // }

  // cancelReservation(resaToCancel: ReservationDto) {
  //   this.resaService.cancelReservation(resaToCancel);
  // }

}
