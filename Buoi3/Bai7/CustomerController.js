import { CustomerService } from './CustomerService.js';

export class CustomerController {
  constructor(queryClient) {
    this.queryClient = queryClient;
    this.queryKey = ['customers'];
    this.refetchInterval = 10 * 60 * 1000;
  }

  getQueryOptions() {
    return {
      queryKey: this.queryKey,
      queryFn: CustomerService.fetchCustomers,
      refetchInterval: this.refetchInterval,
      staleTime: 5 * 60 * 1000,
    };
  }
}