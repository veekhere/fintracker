import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';
import { Expense } from './expense.model';
import { ExpenseStatistic } from './expense-statistic.model';

export class ExpenseData extends BaseDomain {

  /**
   * Big array of user's expenses.
   */
  expenses: Expense[] = [];
  /**
   * User's range stats by category.
   */
  stats: ExpenseStatistic[] = [];

  constructor(data: Partial<ExpenseData> = null) {
    super();
    if (!data) {
      return;
    }
    ObjectUtils.constructorFiller(this, data);
    this.expenses = data.expenses?.map((e) => Expense.toClientObject(e));
    this.stats = data.stats?.map((s) => ExpenseStatistic.toClientObject(s));
  }

  static override toClientObject(entity: any): ExpenseData {
    if (!entity) {
      return null;
    }
    return new ExpenseData(entity);
  }
}
