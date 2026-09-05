import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ExpenseService } from './ExpenseService.js';

export const ExpensePlanFormUI = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      planTitle: '',
      items: [{ name: '', price: '' }], // Khởi tạo sẵn 1 món đồ mặc định
    },
  });

  // Quản lý mảng động qua useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
    rules: {
      required: 'Danh sách chi tiêu phải có ít nhất 1 món đồ',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Chuyển đổi định dạng giá tiền từ chuỗi sang số trước khi gửi
      const formattedData = {
        planTitle: data.planTitle,
        items: data.items.map((item) => ({
          name: item.name,
          price: Number(item.price),
        })),
      };

      await ExpenseService.saveExpensePlan(formattedData);
      alert('Lưu kế hoạch chi tiêu thành công!');
      reset();
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Tạo Kế hoạch Chi tiêu</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Tên kế hoạch */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tên kế hoạch:</label>
          <input
            type="text"
            disabled={isSubmitting}
            {...register('planTitle', { required: 'Vui lòng nhập tên kế hoạch' })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.planTitle && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>{errors.planTitle.message}</p>
          )}
        </div>

        {/* Danh sách món đồ động */}
        <h3>Danh sách Món đồ Cần mua</h3>
        
        {errors.items?.root && (
          <p style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>
            {errors.items.root.message}
          </p>
        )}

        {fields.map((field, index) => (
          <div
            key={field.id} // Sử dụng id duy nhất từ useFieldArray để tránh crash
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              marginBottom: '15px',
              background: '#f9f9f9',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            {/* Tên món đồ */}
            <div style={{ flex: 2 }}>
              <input
                type="text"
                placeholder="Tên món đồ"
                disabled={isSubmitting}
                {...register(`items.${index}.name`, {
                  required: 'Vui lòng nhập tên món đồ',
                })}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
              {errors.items?.[index]?.name && (
                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {errors.items[index].name.message}
                </p>
              )}
            </div>

            {/* Giá tiền */}
            <div style={{ flex: 1 }}>
              <input
                type="number"
                placeholder="Giá tiền (VNĐ)"
                disabled={isSubmitting}
                {...register(`items.${index}.price`, {
                  required: 'Vui lòng nhập giá',
                  min: { value: 1, message: 'Giá tiền phải lớn hơn 0' },
                })}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
              {errors.items?.[index]?.price && (
                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {errors.items[index].price.message}
                </p>
              )}
            </div>

            {/* Nút Xóa món đồ */}
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={isSubmitting}
              style={{
                padding: '8px 12px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Xóa
            </button>
          </div>
        ))}

        {/* Nút Thêm món đồ */}
        <button
          type="button"
          onClick={() => append({ name: '', price: '' })}
          disabled={isSubmitting}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          + Thêm món đồ
        </button>

        {/* Nút Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            display: 'block',
            width: '100%',
            padding: '12px',
            backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
          }}
        >
          {isSubmitting ? 'Đang lưu kế hoạch...' : 'Lưu kế hoạch'}
        </button>
      </form>
    </div>
  );
};