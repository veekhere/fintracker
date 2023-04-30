import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';

export class ExpenseCategory extends BaseDomain {

  name: string = null;

  constructor(category: Partial<ExpenseCategory> = null) {
    super();
    if (!category) {
      return;
    }
    ObjectUtils.constructorFiller(this, category);
  }

  static override toClientObject(entity: any): ExpenseCategory {
    if (!entity) {
      return null;
    }
    return new ExpenseCategory(entity);
  }
}
