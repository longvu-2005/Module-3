export class ProfileService {
  static async updateProfile(profileData) {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Cập nhật hồ sơ thất bại');
    }

    return response.json();
  }
}