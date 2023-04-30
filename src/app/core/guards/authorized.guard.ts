import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

  constructor(
    private readonly auth: AuthService,
    private readonly notificationService: NotificationService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (this.auth.isLoggedIn && this.auth.isEmailConfirmed) {
      return of(true);
    }
    if (!this.auth.isLoggedIn) {
      this.notificationService.error("NOTIFICATION.NOT_AUTHORIZED");
      return of(false);
    }
    if (!this.auth.isEmailConfirmed) {
      this.notificationService.error("NOTIFICATION.EMAIL_IS_NOT_CONFIRMED");
      // TODO redirect to email confirmation page
      return of(false);
    }
    return of(false);
  }
}
