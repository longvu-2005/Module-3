export class ExpenseService {
  static async saveExpensePlan(planData) {
    const response = await fetch('/api/expenses/plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData),
    });

    if (!response.ok) {
      throw new Error('Không thể lưu kế hoạch chi tiêu');
    }

    return response.json();
  }
}