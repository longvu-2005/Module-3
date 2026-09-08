import React, { useState } from 'react';
import { EmployeeService } from './EmployeeService.js';

const initialEmployees = [
  { id: 1, name: 'Nguyễn Văn A', department: 'IT', email: 'a.nguyen@company.com' },
  { id: 2, name: 'Trần Thị B', department: 'HR', email: 'b.tran@company.com' },
  { id: 3, name: 'Lê Văn C', department: 'IT', email: 'c.le@company.com' },
  { id: 4, name: 'Phạm Minh D', department: 'Finance', email: 'd.pham@company.com' },
];

export const EmployeeDirectoryUI = () => {
  const [department, setDepartment] = useState('');
  
  const filteredEmployees = EmployeeService.filterByDepartment(initialEmployees, department);

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Danh bạ Nhân viên (CI/CD Automated)</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Lọc theo Phòng ban:</label>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ padding: '6px' }}>
          <option value="">Tất cả phòng ban</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Họ và Tên</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Phòng ban</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.id}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.name}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.department}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDirectoryUI;