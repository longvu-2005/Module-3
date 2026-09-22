import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Endpoint API mẫu
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // Endpoint lấy thông tin bài viết
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    // Endpoint Like bài viết áp dụng Optimistic Update
    likePost: builder.mutation({
      query: ({ postId, isLiked }) => ({
        url: `posts/${postId}`,
        method: 'PATCH',
        body: {
          // Mô phỏng cập nhật dữ liệu lượt like
          reactions: isLiked ? 1 : 0,
        },
      }),

      // Thao tác Optimistic Update diễn ra trong hàm onQueryStarted
      async onQueryStarted({ postId, isLiked }, { dispatch, queryFulfilled }) {
        // 1. Cập nhật ngay lập tức Cache của query `getPostById` trước khi API phản hồi
        const patchResult = dispatch(
          postApi.util.updateQueryData('getPostById', postId, (draft) => {
            if (isLiked) {
              draft.reactions.likes += 1;
              draft.isLiked = true;
            } else {
              draft.reactions.likes = Math.max(0, draft.reactions.likes - 1);
              draft.isLiked = false;
            }
          })
        );

        try {
          // 2. Chờ API thực hiện xong ngầm ở background
          await queryFulfilled;
        } catch {
          // 3. Nếu API gặp lỗi, HOÀN TÁC (Rollback) lại dữ liệu Cache về trạng thái ban đầu
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetPostByIdQuery, useLikePostMutation } = postApi;