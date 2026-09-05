import { RevenueService } from './RevenueService.js';

export class RevenueController {
  constructor(queryClient) {
    this.queryClient = queryClient;
    this.queryKey = ['revenueData'];
    // Cấu hình staleTime: 5 phút = 5 * 60 * 1000 ms
    this.staleTime = 5 * 60 * 1000;
  }

  // Khai báo options cho useQuery
  getQueryOptions() {
    return {
      queryKey: this.queryKey,
      queryFn: RevenueService.fetchRevenueData,
      staleTime: this.staleTime,
    };
  }

  // Phương thức Force Refresh - Ép buộc gọi API ngay lập tức
  async forceRefresh() {
    return await this.queryClient.refetchQueries({
      queryKey: this.queryKey,
      type: 'active',
      exact: true,
    });
  }
}