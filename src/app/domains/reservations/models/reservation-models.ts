import { User } from '../../users/models/user-models';

export enum StatusReservation {
  PENDING = 'En attente',
  READY = 'Livre disponible pour le retrait',
  CANCELLED = 'Annulée',
  ClOSED = 'Terminée',
}

export interface ReservationDto {
  id?: number; // id optionnel : vide à la création, rempli lors d'un update
  userId: number;
  bookId: number;
  title: string;
  isbn: string;
  dateResa: Date;
  rank: number; // rang dans la liste d'attente
  status: StatusReservation
}

export interface ReservationListDto {
  userId: number;
  reservations: ReservationDto[];
  nbResaEnCours: number;
}
