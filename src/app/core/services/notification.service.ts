import { Injectable } from '@angular/core';
import { NotificationType } from '@core/domain/enums/notification-type.enum';
import { NotifierService } from 'angular-notifier';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(
    private readonly notifierService: NotifierService,
  ) {}

  default(message: string, notificationId?: string): void {
    this.notifierService.notify(NotificationType.Default, message, notificationId);
  }

  info(message: string, notificationId?: string): void {
    this.notifierService.notify(NotificationType.Info, message, notificationId);
  }

  warning(message: string, notificationId?: string): void {
    this.notifierService.notify(NotificationType.Warning, message, notificationId);
  }

  success(message: string, notificationId?: string): void {
    this.notifierService.notify(NotificationType.Success, message, notificationId);
  }

  error(message: string, notificationId?: string): void {
    this.notifierService.notify(NotificationType.Error, message, notificationId);
  }
}
