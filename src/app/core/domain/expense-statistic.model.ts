import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';
import { ExpenseSummary } from './expense-summary.model';
import { DateUtils } from '@core/utils/date-utils';

export class ExpenseStatistic extends BaseDomain {

  name: string = null;
  /**
   * Pre-total of expenses by category.
   */
  expenseSummaries: ExpenseSummary[] = [];
  dateFrom: Date = null;
  dateTo: Date = null;

  constructor(stat: Partial<ExpenseStatistic> = null) {
    super();
    if (!stat) {
      return;
    }
    ObjectUtils.constructorFiller(this, stat);
    this.expenseSummaries = stat.expenseSummaries?.map((es) => ExpenseSummary.toClientObject(es));
    this.dateFrom = DateUtils.toDate(stat.dateFrom);
    this.dateTo = DateUtils.toDate(stat.dateTo);
  }

  static override toClientObject(entity: any): ExpenseStatistic {
    if (!entity) {
      return null;
    }
    return new ExpenseStatistic(entity);
  }
}
