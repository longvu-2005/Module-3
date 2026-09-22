import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Demo API Endpoint
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // Query lấy danh sách bài viết
    getPosts: builder.query({
      query: () => 'posts?limit=5',
      providesTags: ['Post'],
    }),

    // Mutation Like/Unlike bài viết với Optimistic Update
    toggleLikePost: builder.mutation({
      query: ({ postId, isLiked }) => ({
        url: `posts/${postId}`,
        method: 'PATCH',
        data: { isLiked },
      }),
      // Kỹ thuật Optimistic Update được thực hiện tại đây
      async onQueryStarted({ postId, isLiked }, { dispatch, queryFulfilled }) {
        // 1. Cập nhật lạc quan Cache của query 'getPosts' ngay lập tức
        const patchResult = dispatch(
          postApi.util.updateQueryData('getPosts', undefined, (draft) => {
            const post = draft.posts?.find((p) => p.id === postId);
            if (post) {
              post.isLiked = isLiked;
              post.reactions.likes += isLiked ? 1 : -1;
            }
          })
        );

        try {
          // 2. Chờ kết quả phản hồi từ Server
          await queryFulfilled;
        } catch (error) {
          // 3. Nếu API thất bại (Server trả về lỗi/mất mạng), Rollback lại Cache ban đầu
          patchResult.undo();
          console.error('Lỗi khi thả Like, đang hoàn tác trạng thái UI:', error);
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useToggleLikePostMutation } = postApi;