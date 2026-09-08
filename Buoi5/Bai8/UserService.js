export class UserService {
  /**
   * Lọc danh sách người dùng đang hoạt động và gán thêm thời gian truy cập
   * @param {Array} users - Danh sách người dùng
   */
  static filterActiveUsers(users) {
    return users
      .filter((user) => user.isActive)
      .map((user) => ({
        ...user,
      
        lastLoginDate: new Date().toISOString(),
      }));
  }
}