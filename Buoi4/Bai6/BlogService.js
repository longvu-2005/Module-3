export class BlogService {
  static async createPost(postData) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Đăng bài viết thất bại');
    }

    return response.json();
  }
}