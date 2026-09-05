import React from 'react';
import { useFormik } from 'formik';
import { CreditCardSchema } from './CreditCardSchema.js';
import { CreditCardService } from './CreditCardService.js';

export const CreditCardFormUI = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      idCard: '',
      monthlyIncome: '',
    },
    validationSchema: CreditCardSchema.getSchema(),
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        await CreditCardService.applyForCreditCard({
          fullName: values.fullName,
          idCard: values.idCard,
          monthlyIncome: Number(values.monthlyIncome),
        });
        setStatus({ success: 'Gửi hồ sơ mở thẻ thành công! Chúng tôi sẽ liên hệ lại sớm.' });
        resetForm();
      } catch (error) {
        setStatus({ error: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={{ maxWidth: '450px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Đăng ký Mở thẻ Tín dụng</h2>

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
          <label style={{ display: 'block', marginBottom: '5px' }}>Số CCCD (12 chữ số):</label>
          <input
            type="text"
            name="idCard"
            value={formik.values.idCard}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderColor: formik.touched.idCard && formik.errors.idCard ? 'red' : '#ccc',
            }}
          />
          {formik.touched.idCard && formik.errors.idCard && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {formik.errors.idCard}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Thu nhập hàng tháng (VNĐ):</label>
          <input
            type="text"
            name="monthlyIncome"
            value={formik.values.monthlyIncome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderColor: formik.touched.monthlyIncome && formik.errors.monthlyIncome ? 'red' : '#ccc',
            }}
          />
          {formik.touched.monthlyIncome && formik.errors.monthlyIncome && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {formik.errors.monthlyIncome}
            </p>
          )}
        </div>

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
          {formik.isSubmitting ? 'Đang gửi hồ sơ...' : 'Nộp hồ sơ mở thẻ'}
        </button>
      </form>
    </div>
  );
};