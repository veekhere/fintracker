import { PartialSome } from '@core/core.types';
import { ObjectUtils } from '@core/utils/object-utils';

export class ButtonSelectItem {
  id: any = null;
  groupId: string = null;
  name: string = null;
  disabled = false;

  constructor(item: PartialSome<ButtonSelectItem, 'groupId' | 'disabled'> = null) {
    if (!item) {
      return;
    }
    ObjectUtils.constructorFiller(this, item);
  }

  static toClientObject(item: any, groupId?: string): ButtonSelectItem {
    if (!item) {
      return null;
    }
    return new ButtonSelectItem({ groupId, ...item });
  }
}
