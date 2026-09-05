import React, { useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GradingSchema } from './GradingSchema.js';
import { GradingService } from './GradingService.js';

export const GradeKioskUI = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(GradingSchema.getSchema()),
    defaultValues: {
      subjectCode: '',
      studentCount: '',
      grades: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: 'grades',
  });

  // Lắng nghe biến studentCount thời gian thực để sinh số lượng ô nhập
  const studentCount = useWatch({ control, name: 'studentCount' });

  useEffect(() => {
    const count = Number(studentCount);
    
    if (count > 0 && Number.isInteger(count)) {
      // Tự động khởi tạo mảng điểm dựa theo sĩ số đã nhập
      const newGrades = Array.from({ length: count }, (_, index) => ({
        studentId: `SV${String(index + 1).padStart(3, '0')}`,
        score: '',
      }));
      replace(newGrades);
    } else {
      // Khóa/Xóa mảng nhập điểm nếu sĩ số <= 0
      replace([]);
    }
  }, [studentCount, replace]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        subjectCode: data.subjectCode.toUpperCase(),
        studentCount: Number(data.studentCount),
        grades: data.grades.map((item) => ({
          studentId: item.studentId,
          score: Number(item.score),
        })),
      };

      await GradingService.submitGrades(formattedData);
      alert('Gửi bảng điểm thành công!');
      reset();
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Kiosk Quản lý Chấm điểm Cuối kỳ</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Mã môn học */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Mã môn học:</label>
          <input
            type="text"
            placeholder="VD: CS101"
            disabled={isSubmitting}
            {...register('subjectCode')}
            onChange={(e) => setValue('subjectCode', e.target.value.toUpperCase())}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.subjectCode && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>{errors.subjectCode.message}</p>
          )}
        </div>

        {/* Số lượng sinh viên dự thi (Sĩ số) */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Số lượng sinh viên dự thi (Sĩ số):</label>
          <input
            type="number"
            placeholder="Nhập số lượng sinh viên"
            disabled={isSubmitting}
            {...register('studentCount')}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.studentCount && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>{errors.studentCount.message}</p>
          )}
        </div>

        {/* Mảng ô nhập điểm tự động */}
        <h3>Danh sách Nhập điểm Thi</h3>

        {fields.length === 0 ? (
          <p style={{ color: '#666', italic: 'true' }}>
            Vui lòng nhập sĩ số lớn hơn 0 để mở danh sách ô nhập điểm.
          </p>
        ) : (
          <div style={{ maxHeight: '350px', overflowY: 'auto', border: '1px solid #eee', padding: '10px', marginBottom: '20px' }}>
            {fields.map((field, index) => (
              <div
                key={field.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '10px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <div style={{ flex: 1, fontWeight: 'bold' }}>
                  {field.studentId}
                </div>

                <div style={{ flex: 2 }}>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Điểm (0.0 - 10.0)"
                    disabled={isSubmitting}
                    {...register(`grades.${index}.score`)}
                    style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
                  />
                  {errors.grades?.[index]?.score && (
                    <p style={{ color: 'red', fontSize: '12px', marginTop: '3px' }}>
                      {errors.grades[index].score.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {errors.grades?.root && (
          <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>{errors.grades.root.message}</p>
        )}

        {/* Nút Submit */}
        <button
          type="submit"
          disabled={isSubmitting || fields.length === 0}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isSubmitting || fields.length === 0 ? '#6c757d' : '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting || fields.length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {isSubmitting ? 'Đang lưu điểm...' : 'Xác nhận & Gửi bảng điểm'}
        </button>
      </form>
    </div>
  );
};