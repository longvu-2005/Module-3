export class JobService {
  static async submitApplication(profileData) {
    const response = await fetch('/api/candidate/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Cập nhật thông tin thất bại');
    }

    return response.json();
  }
}