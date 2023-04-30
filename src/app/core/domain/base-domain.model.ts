import { v4 as uuidv4 } from 'uuid';

/**
 * Base class for common domain models.
 */
export class BaseDomain {
  id: string = null;

  constructor() {
    this.id = uuidv4();
  }
}
