import { Injectable, signal } from '@angular/core';
import { NotificationModel } from '../models/notification-model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifSignal = signal<NotificationModel | null>(null);
  readonly notifMsg = this.notifSignal.asReadonly();
  private timeout?: any;

  openNotification(notif: NotificationModel) {
    this.notifSignal.set(notif);
    clearTimeout(this.timeout);

    // le timeout automatique uniquement pour les notifications non-loading
    if (notif.type !== 'loading') {
      this.timeout = setTimeout(() => {
        this.notifSignal.set(null);
      }, 3000);
    }
    // pour 'loading' → closeNotification() sera appelé manuellement
  }

  closeNotification(): void {
    this.notifSignal.set(null);
  }
}

// la notif n'apparait pas
// faire la double validation du password
// insert copy
