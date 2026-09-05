export class PasswordService {
  static async createSecondaryPassword(passwordData) {
    const response = await fetch('/api/wallet/secondary-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });

    if (!response.ok) {
      throw new Error('Tạo mật khẩu cấp 2 thất bại');
    }

    return response.json();
  }
}