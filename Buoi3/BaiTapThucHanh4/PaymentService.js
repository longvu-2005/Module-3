export class PaymentService {
  static async processPayment(paymentData) {
    // Giả lập API call mất 3 giây bằng Promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Giả lập phản hồi thành công từ Payment Gateway
        resolve({
          status: 'SUCCESS',
          transactionId: 'TXN_' + Date.now(),
          amount: paymentData.amount,
        });
      }, 3000);
    });
  }
}