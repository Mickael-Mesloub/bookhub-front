import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { NavigationError, provideRouter, Router, withNavigationErrorHandler } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NotificationService } from './components/shared/notification/service/notification-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withNavigationErrorHandler((error: NavigationError) => {
        const router = inject(Router);
        const notificationService = inject(NotificationService);
        
        if (error) {
          console.error('Navigation error occurred:', error.error);
          notificationService.openNotification({
          type: 'alert-error',
          message: error.error,
        });
        }
        router.navigate(['/']);
      }),
    ),
    provideHttpClient(withFetch()),
  ]
};
