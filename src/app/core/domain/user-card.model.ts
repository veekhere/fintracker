import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';
import { PaymentSystem } from './enums/payment-system.enum';

export class UserCard extends BaseDomain {

  number: number = null;
  paymentSystem: PaymentSystem = null;

  constructor(card: Partial<UserCard> = null) {
    super();
    if (!card) {
      return;
    }
    ObjectUtils.constructorFiller(this, card);
    this.paymentSystem = PaymentSystem.toClientObject(card.paymentSystem?.id ?? card.paymentSystem);
  }

  static override toClientObject(entity: any): UserCard {
    if (!entity) {
      return null;
    }
    return new UserCard(entity);
  }
}
