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

export const mockUser = {
  id: 1,
  name: "victor doom",
  email: "test@gmail.com",
  password: "testing@123",
  createdAt: "2025-03-21T15:03:18.071Z",
  updatedAt: "2025-03-21T15:03:18.071Z",
};

export const mockFormData = (data: Record<string, string>) =>
  Object.entries(data).reduce((formData, [key, value]) => {
    formData.append(key, value);
    return formData;
  }, new FormData());

export const mockExpiresAt = () =>
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
