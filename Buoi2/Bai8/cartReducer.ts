export interface Course {
  id: string;
  title: string;
  price: number;
}

export interface CartState {
  items: Course[];
  discountCode: string | null;
  discountPercent: number;
  totalAmount: number;
}

export type CartAction =
  | { type: 'ADD_COURSE'; payload: Course }
  | { type: 'REMOVE_COURSE'; payload: { id: string } }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; discountPercent: number } }
  | { type: 'CLEAR_CART' };

export const initialCartState: CartState = {
  items: [],
  discountCode: null,
  discountPercent: 0,
  totalAmount: 0,
};

// Hàm phụ trợ tính tổng tiền
const calculateTotal = (items: Course[], discountPercent: number): number => {
  const rawTotal = items.reduce((sum, item) => sum + item.price, 0);
  return rawTotal * (1 - discountPercent / 100);
};

// Pure function Reducer
export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_COURSE': {
      // BẪY DỮ LIỆU: Kiểm tra trùng lặp sản phẩm
      const isExist = state.items.some((item) => item.id === action.payload.id);
      if (isExist) {
        // Từ chối thêm, giữ nguyên state cũ hoàn toàn
        return state;
      }

      const updatedItems = [...state.items, action.payload];
      return {
        ...state,
        items: updatedItems,
        totalAmount: calculateTotal(updatedItems, state.discountPercent),
      };
    }

    case 'REMOVE_COURSE': {
      const updatedItems = state.items.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        items: updatedItems,
        totalAmount: calculateTotal(updatedItems, state.discountPercent),
      };
    }

    case 'APPLY_DISCOUNT': {
      const { code, discountPercent } = action.payload;
      return {
        ...state,
        discountCode: code,
        discountPercent,
        totalAmount: calculateTotal(state.items, discountPercent),
      };
    }

    case 'CLEAR_CART':
      return initialCartState;

    default:
      return state;
  }
};