export interface NotificationModel {
  type: NotificationType;
  message: string;
}

export type NotificationType = 'alert-success' | 'alert-error' | 'alert-info' | 'loading' ;
