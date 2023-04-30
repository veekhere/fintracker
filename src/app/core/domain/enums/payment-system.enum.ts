import { BaseEnum, BaseEnumData } from './base.enum';

export enum PaymentSystemEnum {
  Visa = 'payment-visa',
  MasterCard = 'payment-mastercard',
  Mir = 'payment-mir',
  UnionPay = 'payment-union-pay'
}

export class PaymentSystem extends BaseEnum {
  public static PaymentSystemDictionary = new Map<PaymentSystemEnum, BaseEnumData>([
    [PaymentSystemEnum.Visa, { name: 'ENUM.PAYMENT_SYSTEM.VISA' }],
    [PaymentSystemEnum.MasterCard, { name: 'ENUM.PAYMENT_SYSTEM.MASTERCARD' }],
    [PaymentSystemEnum.Mir, { name: 'ENUM.PAYMENT_SYSTEM.MIR' }],
    [PaymentSystemEnum.UnionPay, { name: 'ENUM.PAYMENT_SYSTEM.UNION_PAY' }],
  ]);

  id: PaymentSystemEnum;
  name: string;

  constructor(paymentSystemEnum: PaymentSystemEnum) {
    super();

    if (!paymentSystemEnum) {
      return;
    }

    this.id = paymentSystemEnum;
    this.name = PaymentSystem.PaymentSystemDictionary.get(paymentSystemEnum).name;
  }

  static override toClientObject(serverObject: any): PaymentSystem {
    if (!serverObject || !PaymentSystem.PaymentSystemDictionary.has(serverObject)) {
      return null;
    }
    return new PaymentSystem(serverObject);
  }
}
