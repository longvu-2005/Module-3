export class RevenueService {
  static async fetchRevenueData() {
    const response = await fetch('/api/revenue');
    if (!response.ok) {
      throw new Error('Không thể lấy dữ liệu doanh thu');
    }
    return response.json();
  }
}