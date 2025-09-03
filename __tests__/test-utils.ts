export class BalanceBuilder {
  private currentBalance?: number;
  private income?: number;
  private expenses?: number;

  withCurrentBalance(currentBalance: number) {
    this.currentBalance = currentBalance;
    return this;
  }

  withIncome(income: number) {
    this.income = income;
    return this;
  }

  withExpenses(expenses: number) {
    this.expenses = expenses;
    return this;
  }

  build() {
    if (
      this.currentBalance === undefined ||
      this.expenses === undefined ||
      this.income === undefined
    ) {
      throw new Error("All balance properties must be set");
    }
    return {
      current: this.currentBalance,
      income: this.income,
      expenses: this.expenses,
    };
  }
}
