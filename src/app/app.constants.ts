export class AppConstants {
  static readonly KEYS = {
    PREFIX: 'VEEKHERE-FINTRACKER: ',
    LANGUAGE: 'LANGUAGE',
    USER: 'USER',
  } as const;

  static readonly FIRESTORE_PATHS = {
    USERS: 'users',
  } as const;

  static readonly LANGUAGES = {
    EN: 'en',
    RU: 'ru',
  };
}

export class AppPathConstants {
  static readonly EMPTY = '';
  static readonly WILDCARD = '**';
  static readonly AUTH = 'auth';
  static readonly EMAIL_CONFIRMATION = 'confirm-email-address';
}
