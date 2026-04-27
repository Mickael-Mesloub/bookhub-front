import { User } from '../../users/models/user-models';

export enum StatusReservation {
  PENDING = 'En attente',
  OK = 'Livre disponible pour le retrait',
  CANCELLED = 'Annulée',
}

export interface ReservationDto {
  id: number;
  userId: User['id'];
  bookId: number;
  bookTitle: string;
  dateResa: Date;
  rank: number; // rang dans la liste d'attente
  status: StatusReservation
}

export interface ReservationListDto {
  reservations: ReservationDto[];
  nbResa: number;
}
