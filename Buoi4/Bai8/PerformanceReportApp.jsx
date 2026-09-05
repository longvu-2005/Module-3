import React from 'react';
import { FormikForm } from './FormikForm.jsx';
import { RHFForm } from './RHFForm.jsx';

export const PerformanceReportApp = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h2>Báo cáo Hiệu năng: Formik vs React Hook Form</h2>
      <p>Mở F12 (Console) để quan sát số lần log ra màn hình khi gõ 10 ký tự.</p>
      
      <FormikForm />
      <RHFForm />
    </div>
  );
};