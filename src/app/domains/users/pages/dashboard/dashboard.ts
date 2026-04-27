import { Component } from '@angular/core';
import { Reservations } from '../../../reservations/reservations';

@Component({
  selector: 'app-dashboard',
  imports: [Reservations],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
