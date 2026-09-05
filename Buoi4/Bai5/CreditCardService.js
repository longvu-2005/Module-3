export class CreditCardService {
  static async applyForCreditCard(cardData) {
    const response = await fetch('/api/credit-card/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    });

    if (!response.ok) {
      throw new Error('Gửi hồ sơ mở thẻ thất bại');
    }

    return response.json();
  }
}