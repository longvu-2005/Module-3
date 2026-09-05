import React from 'react';
import { useForm } from 'react-hook-form';
import { BlogService } from './BlogService.js';

export const BlogPostFormUI = () => {
  // Khởi tạo useForm từ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await BlogService.createPost(data);
      alert('Đăng bài viết thành công!');
      reset();
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Soạn thảo Bài viết Blog</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Trường Tiêu đề */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Tiêu đề bài viết:</label>
          <input
            type="text"
            disabled={isSubmitting}
            {...register('title', {
              required: 'Vui lòng nhập tiêu đề bài viết',
              minLength: {
                value: 5,
                message: 'Tiêu đề bài viết phải có ít nhất 5 ký tự',
              },
            })}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderColor: errors.title ? 'red' : '#ccc',
            }}
          />
          {errors.title && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Trường Nội dung bài viết (Uncontrolled Textarea) */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nội dung bài viết:</label>
          <textarea
            rows="10"
            disabled={isSubmitting}
            {...register('content', {
              required: 'Vui lòng nhập nội dung bài viết',
              minLength: {
                value: 50,
                message: 'Nội dung bài viết quá ngắn (tối thiểu phải có 50 ký tự)',
              },
            })}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              borderColor: errors.content ? 'red' : '#ccc',
            }}
          />
          {errors.content && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
              {errors.content.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '10px 20px',
            width: '100%',
            backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
          }}
        >
          {isSubmitting ? 'Đang xuất bản...' : 'Xuất bản bài viết'}
        </button>
      </form>
    </div>
  );
};