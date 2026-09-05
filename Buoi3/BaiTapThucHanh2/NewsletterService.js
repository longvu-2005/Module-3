export class NewsletterService {
  static async subscribe(email) {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Đăng ký thất bại, vui lòng thử lại sau');
    }

    return response.json();
  }
}