import { ObjectUtils } from '../utils/object-utils';

/**
 * User model.
 */
export class User {
  /**
   * User's UUID.
   */
  uid: string = null;
  /**
   * User's e-mail.
   */
  email: string = null;
  /**
   * Display name (alias, nickname).
   */
  displayName: string = null;
  /**
   * Avatar URL.
   */
  photoURL: string = null;
  /**
   * Is user's e-mail verified flag.
   */
  emailVerified: boolean = false;

  constructor(entity: User = null) {
    if (!entity) {
      return null;
    }
    ObjectUtils.constructorFiller(this, entity);
  }
}
