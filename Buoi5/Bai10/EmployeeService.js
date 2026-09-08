export class EmployeeService {
  /**
   * Lọc danh sách nhân viên theo phòng ban
   * @param {Array} employees 
   * @param {string} department 
   */
  static filterByDepartment(employees, department) {
    if (!employees || !Array.isArray(employees)) return [];
    if (!department) return employees;
    return employees.filter((emp) => emp.department === department);
  }
}