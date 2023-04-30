import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';
import { ExpenseCategory } from './expense-category.model';
import { UserCard } from './user-card.model';
import { DateUtils } from '@core/utils/date-utils';

export class Expense extends BaseDomain {

  name: string = null;
  description: string = null;
  amount: number = 0;
  count: number = 1;
  card: UserCard = null;
  category: ExpenseCategory = null;
  date: Date = new Date();

  constructor(expense: Partial<Expense> = null) {
    super();
    if (!expense) {
      return;
    }
    ObjectUtils.constructorFiller(this, expense);
    this.card = UserCard.toClientObject(expense.card);
    this.category = ExpenseCategory.toClientObject(expense.category);
    this.date = DateUtils.toDate(expense.date);
  }

  static override toClientObject(entity: any): Expense {
    if (!entity) {
      return null;
    }
    return new Expense(entity);
  }
}
