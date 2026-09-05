import { InventoryService } from './InventoryService.js';
import { useInventoryStore } from './useInventoryStore.js';

export class InventoryController {
  constructor(queryClient) {
    this.queryClient = queryClient;
    this.queryKey = ['inventory'];
  }

  getInventoryQueryOptions() {
    return {
      queryKey: this.queryKey,
      queryFn: InventoryService.fetchInventory,
      staleTime: 2 * 60 * 1000,
    };
  }

  getUpdateStockMutationOptions() {
    return {
      mutationFn: ({ id, quantity }) => InventoryService.updateStock({ id, quantity }),
      
      onSuccess: () => {
        // Tự động đóng Sidebar (Client State)
        useInventoryStore.getState().closeSidebar();

        // Invalidate để đồng bộ lại dữ liệu mới nhất từ Server (Server State)
        this.queryClient.invalidateQueries({ queryKey: this.queryKey });
      },
    };
  }
}