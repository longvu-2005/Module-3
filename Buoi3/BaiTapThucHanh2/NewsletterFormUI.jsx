import React from 'react';
import { useFormik } from 'formik';
import { NewsletterService } from './NewsletterService.js';

export const NewsletterFormUI = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Vui lòng nhập địa chỉ email';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Địa chỉ email không hợp lệ';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        await NewsletterService.subscribe(values.email);
        setStatus({ success: 'Đăng ký nhận bản tin thành công!' });
        resetForm();
      } catch (error) {
        setStatus({ error: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Điều kiện hiển thị lỗi: Chỉ khi đã tương tác xong (touched) VÀ có lỗi (errors)
  const showError = Boolean(formik.touched.email && formik.errors.email);

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Đăng ký Nhận Bản tin</h2>

      {formik.status?.success && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>{formik.status.success}</p>
      )}
      {formik.status?.error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{formik.status.error}</p>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email nhận tin:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderColor: showError ? 'red' : '#ccc',
            }}
          />
          {showError && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {formik.errors.email}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={{ padding: '10px 16px', cursor: 'pointer', width: '100%' }}
        >
          {formik.isSubmitting ? 'Đang gửi...' : 'Đăng ký ngay'}
        </button>
      </form>
    </div>
  );
};