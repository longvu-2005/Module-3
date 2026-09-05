import { OrderService } from './OrderService.js';

export class OrderController {
  constructor(queryClient) {
    this.queryClient = queryClient;
    this.queryKey = ['orders'];
  }

  getOrdersQueryOptions() {
    return {
      queryKey: this.queryKey,
      queryFn: OrderService.fetchOrders,
    };
  }

  getProcessMutationOptions() {
    return {
      mutationFn: (orderId) => OrderService.markAsProcessed(orderId),

      // 1. Kích hoạt ngay khi Click (t = 0.0s)
      onMutate: async (orderId) => {
        // Hủy các refetch đang chạy để không đè lên cache tạm thời
        await this.queryClient.cancelQueries({ queryKey: this.queryKey });

        // Lưu lại dữ liệu Cache cũ để Backup
        const previousOrders = this.queryClient.getQueryData(this.queryKey);

        // Cập nhật Optimistic vào Cache lập tức
        if (previousOrders) {
          this.queryClient.setQueryData(this.queryKey, (old) =>
            old.map((order) =>
              order.id === orderId
                ? { ...order, status: 'PROCESSED' }
                : order
            )
          );
        }

        // Trả về context chứa dữ liệu cũ
        return { previousOrders };
      },

      // 2. Nếu API lỗi -> Khôi phục dữ liệu từ Context Backup
      onError: (err, orderId, context) => {
        if (context?.previousOrders) {
          this.queryClient.setQueryData(this.queryKey, context.previousOrders);
        }
      },

      // 3. Khi hoàn tất (Thành công hoặc Lỗi) -> Invalidate để đồng bộ chuẩn với Server
      onSettled: () => {
        this.queryClient.invalidateQueries({ queryKey: this.queryKey });
      },
    };
  }
}