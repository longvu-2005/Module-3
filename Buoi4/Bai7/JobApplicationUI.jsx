import React from 'react';
import { useFormik } from 'formik';
import { JobSchema } from './JobSchema.js';
import { JobService } from './JobService.js';

export const JobApplicationUI = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      jobStatus: 'UNEMPLOYED', // Mặc định: Đang tìm việc
      currentCompany: '',
    },
    validationSchema: JobSchema.getSchema(),
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        // Tối ưu dữ liệu gửi đi: Nếu không phải 'EMPLOYED', xóa field currentCompany
        const payload = {
          ...values,
          currentCompany: values.jobStatus === 'EMPLOYED' ? values.currentCompany : null,
        };

        await JobService.submitApplication(payload);
        setStatus({ success: 'Gửi hồ sơ thành công!' });
        resetForm();
      } catch (error) {
        setStatus({ error: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const isEmployed = formik.values.jobStatus === 'EMPLOYED';

  return (
    <div style={{ maxWidth: '450px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Cập nhật Hồ sơ Ứng viên</h2>

      {formik.status?.success && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>{formik.status.success}</p>
      )}
      {formik.status?.error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{formik.status.error}</p>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Họ và tên:</label>
          <input
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderColor: formik.touched.fullName && formik.errors.fullName ? 'red' : '#ccc',
            }}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {formik.errors.fullName}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Trạng thái việc làm:</label>
          <select
            name="jobStatus"
            value={formik.values.jobStatus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="UNEMPLOYED">Đang tìm việc</option>
            <option value="EMPLOYED">Đã có việc</option>
          </select>
        </div>

        {/* Ẩn/Hiện động trường Công ty hiện tại dựa trên trạng thái */}
        {isEmployed && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Công ty hiện tại (*):</label>
            <input
              type="text"
              name="currentCompany"
              value={formik.values.currentCompany}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                borderColor: formik.touched.currentCompany && formik.errors.currentCompany ? 'red' : '#ccc',
              }}
            />
            {formik.touched.currentCompany && formik.errors.currentCompany && (
              <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
                {formik.errors.currentCompany}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={{
            padding: '10px 20px',
            width: '100%',
            backgroundColor: formik.isSubmitting ? '#6c757d' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: formik.isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {formik.isSubmitting ? 'Đang gửi...' : 'Lưu thông tin'}
        </button>
      </form>
    </div>
  );
};