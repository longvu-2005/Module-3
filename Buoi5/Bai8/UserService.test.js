import { UserService } from './UserService.js';

describe('UserService - Array/Object Matchers Analysis', () => {
  const mockUsers = [
    { id: 1, name: 'Alice', role: 'User', isActive: true },
    { id: 2, name: 'Bob', role: 'Admin', isActive: true },
    { id: 3, name: 'Charlie', role: 'User', isActive: false },
  ];

  // =========================================================================
  test('[DEMO FAIL] toContainEqual sẽ thất bại do thuộc tính động lastLoginDate', () => {
    const activeUsers = UserService.filterActiveUsers(mockUsers);

   
  });


  test('Giải pháp 1: Kiểm tra Admin tồn tại bằng Partial Object Matcher (Khuyên dùng)', () => {
    const activeUsers = UserService.filterActiveUsers(mockUsers);


    expect(activeUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: 'Admin',
          name: 'Bob',
          isActive: true,
        }),
      ])
    );
  });

  test('Giải pháp 2: Duyệt vòng lặp kiểm tra từng phần tử với objectContaining', () => {
    const activeUsers = UserService.filterActiveUsers(mockUsers);

    let isAdminFound = false;

    activeUsers.forEach((user) => {
      if (user.role === 'Admin') {
        isAdminFound = true;
       
        expect(user).toEqual(
          expect.objectContaining({
            id: 2,
            name: 'Bob',
            role: 'Admin',
            isActive: true,
          })
        );
      }
    });

 
    expect(isAdminFound).toBe(true);
  });
});