// ❌ CÁCH VIẾT BỊ LỖI
const Header = () => {
  // Lấy toàn bộ Store object
  const state = useAppStore(); 
  
  // Hoặc trích xuất toàn bộ object state
  // const { theme, userRole } = useAppStore();

  return (
    <header className={state.theme}>
      <span>{state.userRole}</span>
    </header>
  );
};