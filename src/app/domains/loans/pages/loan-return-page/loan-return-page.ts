import { DatePipe } from '@angular/common';
import { Component, computed, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Button } from '../../../../components/shared/button/button';
import { NotificationService } from '../../../../components/shared/notification/service/notification-service';
import { User } from '../../../users/models/user-models';
import { UserService } from '../../../users/services/user-service';
import { Loan } from '../../loan-models';
import { LoanReturnResolverData } from '../../resolvers/loan-return-resolver';

@Component({
  selector: 'app-loan-return-page',
  imports: [Button, DatePipe],
  templateUrl: './loan-return-page.html',
  styleUrl: './loan-return-page.scss',
})
export class LoanReturnPage {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly userService: UserService = inject(UserService);
  private readonly notificationService: NotificationService = inject(NotificationService);

  data: LoanReturnResolverData | undefined = this.route.snapshot.data[
    'data'
  ] as LoanReturnResolverData;

  users: Signal<User[]> = computed(() => this.data?.['users'] as User[]);
  loans: Signal<Loan[]> = computed(() => this.data?.['openedLoans'] as Loan[]);
  selectedLoanIds: number[] = [];

  today: Date = new Date();

  // Value of the searchbar input
  search = signal<string>('');
  userFound = signal<User | null>(null);

  handleSearch(search: string) {
    console.log(this.search());
    console.log(this.userFound());
    this.search.set(search);
  }

  handleClick(): void {
    console.log(this.users());
    console.log(this.loans());
  }

  addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  // TODO :
  // ✅ Récupérer toutes les loans en cours
  // les afficher dans un tableau ou une liste paginée ?
  // Récupérer tous les users
  // Lorsqu'on commence à taper un nom d'utilisateur, filtrer sur les users pour récupérer celui dont le nom ou prenom ou email ou username like this.search()
  // Afficher que les loans de cet utilisateur
  // Si date du jour > date emprunt + 14 jours => Retard. Afficher message.
  // Afficher un petit form avec état + date retour (now par défaut)
  // Update loan => màj état copy
}
