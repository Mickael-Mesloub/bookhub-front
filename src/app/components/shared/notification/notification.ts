import { Component, inject } from '@angular/core';
import { NotificationService } from './service/notification-service';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {
  private readonly notificationService = inject(NotificationService);
  notifMsg = this.notificationService.notifMsg;
}
