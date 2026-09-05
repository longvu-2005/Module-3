import React from 'react';
import { useFormik } from 'formik';
import { PasswordSchema } from './PasswordSchema.js';
import { PasswordService } from './PasswordService.js';

export const CreateSecondaryPasswordUI = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: PasswordSchema.getSchema(),
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        await PasswordService.createSecondaryPassword({
          secondaryPassword: values.newPassword,
        });
        setStatus({ success: 'Tạo mật khẩu cấp 2 thành công!' });
        resetForm();
      } catch (error) {
        setStatus({ error: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Tạo Mật khẩu Cấp 2</h2>

      {formik.status?.success && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>{formik.status.success}</p>
      )}
      {formik.status?.error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{formik.status.error}</p>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Mật khẩu cấp 2 mới:</label>
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderColor: formik.touched.newPassword && formik.errors.newPassword ? 'red' : '#ccc',
            }}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {formik.errors.newPassword}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Xác nhận mật khẩu cấp 2:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderColor: formik.touched.confirmPassword && formik.errors.confirmPassword ? 'red' : '#ccc',
            }}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={{ padding: '10px 16px', cursor: 'pointer', width: '100%' }}
        >
          {formik.isSubmitting ? 'Đang tạo...' : 'Xác nhận tạo'}
        </button>
      </form>
    </div>
  );
};