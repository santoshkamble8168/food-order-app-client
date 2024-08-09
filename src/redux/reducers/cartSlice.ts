import { CartItem } from "@/pages/DetailPage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Cart = {
  items: CartItem[];
  total: number;
  totalItems: number;
  restaurantId: string;
};

const initialState: Cart = {
  items: [],
  total: 0,
  totalItems: 0,
  restaurantId: "",
};

type cartPayload = {
  _id: string;
  name: string;
  price: number;
  restaurantId: string;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<cartPayload>) => {
      const newItem = action.payload;
      const itemExist = state.items.find((item) => item._id === newItem._id);
      if (itemExist) {
        itemExist.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.total += newItem.price;
      state.totalItems += 1;

      //store data into session
      sessionStorage.setItem(
        `cartItems-${action.payload.restaurantId}`,
        JSON.stringify(state.items)
      );
    },
    removeItem: (
      state,
      action: PayloadAction<{ _id: string; restaurantId: string }>
    ) => {
      const itemId = action.payload._id;
      const itemExist = state.items.find((item) => item._id === itemId);

      if (itemExist) {
        state.total -= itemExist.price;
        state.totalItems -= 1;

        if (itemExist.quantity > 1) {
          itemExist.quantity -= 1; // Decrease quantity by 1
        } else {
          // If quantity is 1, remove the item from the cart
          state.items = state.items.filter((item) => item._id !== itemId);
        }
      }

      // Store updated cart data into session storage
      sessionStorage.setItem(
        `cartItems-${action.payload.restaurantId}`,
        JSON.stringify(state.items)
      );
    },
    clearCart: (state, action: PayloadAction<string>) => {
      state.items = [];
      state.total = 0;
      state.totalItems = 0;

      //clear session
      sessionStorage.removeItem(`cartItems-${action.payload}`);
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
