export interface NotificationModel {
  type: NotificationType;
  message: string;
}

export type NotificationType = 'success' | 'error' | 'info';
