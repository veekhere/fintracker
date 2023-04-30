import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '@core/domain/user.model';
import { LocalStorageService } from '@core/services/local-storage.service';
import { NotificationService } from '@core/services/notification.service';
import { MessageUtils } from '@core/utils/message-utils';
import { PathUtils } from '@core/utils/path-utils';
import * as auth from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { AppConstants, AppPathConstants } from 'src/app/app.constants';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private user$ = new BehaviorSubject<User>(null);

  constructor(
    private readonly afs: AngularFirestore,
    private readonly afAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly localStorage: LocalStorageService,
    private readonly notificationService: NotificationService,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user$.next(User.toClientObject(user));
        this.localStorage.setItem(AppConstants.KEYS.USER, this.user$.value);
      } else {
        this.localStorage.removeItem(AppConstants.KEYS.USER);
      }
    });
  }

  // !
  get user(): User {
    return !!this.localStorageData
      ? new User(this.localStorageData)
      : null;
  }

  private get localStorageData(): any {
    return this.localStorage.getItem(AppConstants.KEYS.USER);
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }

  get isEmailConfirmed(): boolean {
    return this.user.emailVerified;
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate([AppPathConstants.EMPTY]);
          }
        });
      })
      .catch((error) => {
        this.notificationService.error(MessageUtils.firebaseMessage(error.message));
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        this.notificationService.error(MessageUtils.firebaseMessage(error.message));
      });
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        // TODO
        this.router.navigate([AppPathConstants.EMAIL_CONFIRMATION]);
      });
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.notificationService.error('success', 'Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        this.notificationService.error(MessageUtils.firebaseMessage(error.message));
      });
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate([AppPathConstants.EMPTY]);
    });
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.localStorage.removeItem(AppConstants.KEYS.USER);
      // this.router.navigate([AppPathConstants.AUTH]); // !
    });
  }

  updateUserData(updatableData: Pick<User, 'expenseData'>): void {
    if (!this.isLoggedIn) {
      return;
    }
    this.user$.next(User.toClientObject({
      ...this.user$.value,
      ...updatableData,
    }));
  }

  // Auth logic to run auth providers
  private authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.setUserData(result.user);
      })
      .catch((error) => {
        this.notificationService.error(MessageUtils.firebaseMessage(error.message));
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  private setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      PathUtils.concat([AppConstants.FIRESTORE_PATHS.USERS, user.uid])
    );
    const userData: Partial<Record<keyof User, string>> = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, { merge: true });
  }
}