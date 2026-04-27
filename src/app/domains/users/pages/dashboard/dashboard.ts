import { Component } from '@angular/core';
import { Reservations } from '../../../reservations/reservations';
import { DashboardUser } from './cards/dashboard-user/dashboard-user';
import { DashboardLibrarian } from './cards/dashboard-librarian/dashboard-librarian';
import { DashboardAdmin } from './cards/dashboard-admin/dashboard-admin';

@Component({
  selector: 'app-dashboard',
  imports: [Reservations],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
