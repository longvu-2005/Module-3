import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PaymentService } from './PaymentService.js';

export const PaymentFormUI = () => {
  const formik = useFormik({
    initialValues: {
      amount: '',
      cardNumber: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required('Vui lòng nhập số tiền')
        .positive('Số tiền phải lớn hơn 0'),
      cardNumber: Yup.string()
        .required('Vui lòng nhập số thẻ')
        .length(16, 'Số thẻ phải đúng 16 chữ số'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        // Gọi hàm xử lý API mất 3s
        const result = await PaymentService.processPayment(values);
        setStatus({ success: `Thanh toán thành công! Mã GD: ${result.transactionId}` });
        resetForm();
      } catch (error) {
        setStatus({ error: 'Thanh toán thất bại, vui lòng thử lại.' });
      } finally {
        // Trạng thái isSubmitting được giải phóng về false
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Thanh toán Đơn hàng</h2>

      {formik.status?.success && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>{formik.status.success}</p>
      )}
      {formik.status?.error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{formik.status.error}</p>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Số tiền (VND):</label>
          <input
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderColor: formik.touched.amount && formik.errors.amount ? 'red' : '#ccc',
            }}
          />
          {formik.touched.amount && formik.errors.amount && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {formik.errors.amount}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Số thẻ thanh toán:</label>
          <input
            type="text"
            name="cardNumber"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderColor: formik.touched.cardNumber && formik.errors.cardNumber ? 'red' : '#ccc',
            }}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {formik.errors.cardNumber}
            </p>
          )}
        </div>

        {/* Nút Submit bảo vệ bằng isSubmitting */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={{
            padding: '12px 20px',
            width: '100%',
            backgroundColor: formik.isSubmitting ? '#6c757d' : '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: formik.isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {formik.isSubmitting ? 'Đang xử lý...' : 'Thanh toán'}
        </button>
      </form>
    </div>
  );
};