import { Injectable, signal } from '@angular/core';
import { NotificationModel } from '../models/notification-model';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private notifSignal = signal<NotificationModel | null>(null);
  readonly notifMsg = this.notifSignal.asReadonly();
  private timeout?: any;

  show(notif: NotificationModel) {
    this.notifSignal.set(notif);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.notifSignal.set(null);
    }, 60000);
  }
}

// la notif n'apparait pas
// faire la double validation du password
// insert copy
