import React from 'react';
import { useGetPostByIdQuery, useLikePostMutation } from './postApi';

export const PostCard = ({ postId = 1 }) => {
  // Lấy dữ liệu bài viết từ RTK Query Cache
  const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);
  const [likePost] = useLikePostMutation();

  if (isLoading) return <p>Đang tải bài viết...</p>;
  if (isError || !post) return <p style={{ color: 'red' }}>Không thể tải bài viết!</p>;

  // Đọc trạng thái từ Cache đã được Optimistic Update
  const isLiked = post.isLiked || false;
  const likesCount = post.reactions?.likes || 0;

  const handleToggleLike = async () => {
    try {
      // Gọi mutation kích hoạt Optimistic Update
      await likePost({ postId, isLiked: !isLiked }).unwrap();
    } catch (error) {
      // Nhận thông báo nếu API bị lỗi và tự động Rollback
      alert('Không thể thực hiện thao tác. Đã hoàn tác lượt Like!');
    }
  };

  return (
    <div
      style={{
        border: '1px solid #e1e8ed',
        borderRadius: '12px',
        padding: '20px',
        maxWidth: '500px',
        margin: '40px auto',
        fontFamily: 'sans-serif',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <h3 style={{ marginTop: 0 }}>{post.title}</h3>
      <p style={{ color: '#4c566a', lineHeight: '1.5' }}>{post.body}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
        <button
          onClick={handleToggleLike}
          style={{
            backgroundColor: isLiked ? '#1da1f2' : '#e1e8ed',
            color: isLiked ? '#ffffff' : '#333333',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease, color 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>{isLiked ? '👍 Đã thích' : '👍 Thích'}</span>
        </button>

        <span style={{ color: '#657786', fontSize: '14px', fontWeight: '500' }}>
          {likesCount} lượt thích
        </span>
      </div>
    </div>
  );
};