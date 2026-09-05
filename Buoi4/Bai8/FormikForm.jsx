import React from 'react';
import { useFormik } from 'formik';

export const FormikForm = () => {
  // Đo lường số lần re-render
  console.log('[DIAGNOSTIC] Rendered FormikForm');

  const formik = useFormik({
    initialValues: {
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
    },
    onSubmit: (values) => {
      console.log('Formik Data:', values);
    },
  });

  return (
    <div style={{ padding: '20px', border: '1px solid red', marginBottom: '20px' }}>
      <h3>1. Formik (Controlled Component)</h3>
      <form onSubmit={formik.handleSubmit}>
        {['field1', 'field2', 'field3', 'field4', 'field5'].map((fieldName) => (
          <div key={fieldName} style={{ marginBottom: '10px' }}>
            <label>{fieldName}: </label>
            <input
              type="text"
              name={fieldName}
              value={formik.values[fieldName]}
              onChange={formik.handleChange}
            />
          </div>
        ))}
        <button type="submit">Submit Formik</button>
      </form>
    </div>
  );
};