export class CustomerService {
  static async fetchCustomers() {
    const response = await fetch('/api/customers');
    if (!response.ok) {
      throw new Error('Không thể tải danh sách khách hàng');
    }
    return response.json();
  }
}