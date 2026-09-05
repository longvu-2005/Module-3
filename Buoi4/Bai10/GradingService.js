export class GradingService {
  static async submitGrades(gradingData) {
    const response = await fetch('/api/grades/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gradingData),
    });

    if (!response.ok) {
      throw new Error('Gửi bảng điểm thất bại, vui lòng kiểm tra lại');
    }

    return response.json();
  }
}