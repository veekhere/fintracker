import { ObjectUtils } from '../utils/object-utils';
import { ExpenseData } from './expense-data.model';

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
  /**
   * User's expense data.
   */
  expenseData: ExpenseData = null;

  constructor(entity: User = null) {
    if (!entity) {
      return null;
    }
    ObjectUtils.constructorFiller(this, entity);
    this.expenseData = ExpenseData.toClientObject(entity.expenseData);
  }

  static toClientObject(entity: any): User {
    if (!entity) {
      return null;
    }
    return new User(entity);
  }

  toServerObject(): string {
    return JSON.stringify(this);
  }
}
