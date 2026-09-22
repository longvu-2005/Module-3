import React from 'react';
import { useGetPostsQuery, useToggleLikePostMutation } = './postApi';

export const PostList = () => {
  const { data, isLoading, isError } = useGetPostsQuery();
  const [toggleLike] = useToggleLikePostMutation();

  const handleLikeToggle = async (post) => {
    const nextIsLiked = !post.isLiked;
    
    try {
      // Gọi mutation (UI đã được cập nhật ngay lập tức nhờ onQueryStarted)
      await toggleLike({ postId: post.id, isLiked: nextIsLiked }).unwrap();
    } catch (err) {
      // Thông báo cho người dùng khi bị Rollback do lỗi
      alert('Không thể kết nối đến máy chủ! Thao tác Like đã bị hoàn tác.');
    }
  };

  if (isLoading) return <div style={{ textAlign: 'center', padding: '20px' }}>⏳ Đang tải bài viết...</div>;
  if (isError) return <div style={{ color: 'red', textAlign: 'center' }}>❌ Lỗi tải bài viết.</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', fontFamily: 'sans-serif' }}>
      <h2>Bảng tin (Optimistic Update Demo)</h2>
      {data?.posts?.map((post) => {
        const isLiked = !!post.isLiked;
        const likesCount = post.reactions?.likes || 0;

        return (
          <div
            key={post.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <h3 style={{ margin: '0 0 10px 0' }}>{post.title}</h3>
            <p style={{ color: '#555', fontSize: '14px' }}>{post.body}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
              <button
                onClick={() => handleLikeToggle(post)}
                style={{
                  backgroundColor: isLiked ? '#2563eb' : '#f3f4f6',
                  color: isLiked ? '#ffffff' : '#374151',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <span>{isLiked ? '👍 Đã thích' : '👍 Thích'}</span>
              </button>
              
              <span style={{ fontSize: '14px', color: '#666' }}>
                {likesCount} lượt thích
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};