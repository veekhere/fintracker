import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';
import { ExpenseCategory } from './expense-category.model';

export class ExpenseSummary extends BaseDomain {

  category: ExpenseCategory = null;
  total: number = null;

  constructor(summary: Partial<ExpenseSummary> = null) {
    super();
    if (!summary) {
      return;
    }
    ObjectUtils.constructorFiller(this, summary);
    this.category = ExpenseCategory.toClientObject(summary.category);
  }

  static override toClientObject(entity: any): ExpenseSummary {
    if (!entity) {
      return null;
    }
    return new ExpenseSummary(entity);
  }
}