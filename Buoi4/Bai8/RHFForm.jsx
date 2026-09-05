import React from 'react';
import { useForm } from 'react-hook-form';

export const RHFForm = () => {
  // Đo lường số lần re-render
  console.log('[DIAGNOSTIC] Rendered RHFForm');

  const { register, handleSubmit } = useForm({
    defaultValues: {
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
    },
  });

  const onSubmit = (data) => {
    console.log('React Hook Form Data:', data);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid green' }}>
      <h3>2. React Hook Form (Uncontrolled Component)</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {['field1', 'field2', 'field3', 'field4', 'field5'].map((fieldName) => (
          <div key={fieldName} style={{ marginBottom: '10px' }}>
            <label>{fieldName}: </label>
            <input
              type="text"
              {...register(fieldName)}
            />
          </div>
        ))}
        <button type="submit">Submit RHF</button>
      </form>
    </div>
  );
};