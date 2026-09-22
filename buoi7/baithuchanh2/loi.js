
const updateProductMutation = useMutation({
  mutationFn: updateProductApi,
  onSuccess: () => {
    // Chỉ hiển thị thông báo thành công mà KHÔNG làm mới Cache
    toast.success("Cập nhật giá sản phẩm thành công!");
  },
});