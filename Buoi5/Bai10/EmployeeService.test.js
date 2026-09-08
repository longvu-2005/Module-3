import { describe, test, expect } from 'vitest';
import { EmployeeService } from './EmployeeService.js';

describe('EmployeeService CI/CD Test Suite', () => {
  const mockEmployees = [
    { id: 1, name: 'Nguyễn Văn A', department: 'IT' },
    { id: 2, name: 'Trần Thị B', department: 'HR' },
    { id: 3, name: 'Lê Văn C', department: 'IT' },
  ];

  test('Lọc đúng danh sách nhân viên thuộc phòng IT', () => {
    const result = EmployeeService.filterByDepartment(mockEmployees, 'IT');
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Nguyễn Văn A');
  });

  test('Trả về toàn bộ danh sách khi không truyền phòng ban', () => {
    const result = EmployeeService.filterByDepartment(mockEmployees, '');
    expect(result).toHaveLength(3);
  });
});