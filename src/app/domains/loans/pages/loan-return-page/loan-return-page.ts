import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from '../../../../components/shared/button/button';
import { NotificationService } from '../../../../components/shared/notification/service/notification-service';
import { ApiResponse } from '../../../../config/api/api';
import { User } from '../../../users/models/user-models';
import { UserService } from '../../../users/services/user-service';

@Component({
  selector: 'app-loan-return-page',
  imports: [Button],
  templateUrl: './loan-return-page.html',
  styleUrl: './loan-return-page.scss',
})
export class LoanReturnPage implements OnInit {
  userService: UserService = inject(UserService);
  notificationService: NotificationService = inject(NotificationService);
  search = signal<string>('');
  userFound = signal<User | null>(null);
  allUsers = signal<User[] | []>([]);

  handleSearch(search: string) {
    console.log(this.search());
    console.log(this.userFound());
    this.search.set(search);
  }

  // TODO : Filtrer sur les users pour récupérer celui dont le nom ou prenom ou email ou username like this.search()
  // puis récupérer toutes les loans en cours je sais pas comment

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: ApiResponse<User[]>) => {
        this.allUsers.set(response.data);
        this.notificationService.closeNotification();
        console.log(this.allUsers());
      },
      error: (err) => {
        console.error('Failed to fetch books: ', err);
        this.notificationService.closeNotification();
      },
    });
  }
}
