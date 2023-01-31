/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem, Product } from '~/types';

interface CartState {
  items: Array<CartItem>;
  quantityItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  quantityItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<Product & Partial<{ quantity: number }>>,
    ) {
      const itemExistInCart = state.items.find(
        (p) => p.id === action.payload.id,
      );

      if (!itemExistInCart) {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity === 0 ? 1 : action.payload.quantity!,
        });
        return;
      }

      if (action.payload.quantity) {
        itemExistInCart.quantity += action.payload.quantity;
        return;
      }

      itemExistInCart.quantity += 1;
    },
    counterQuantityItems(state) {
      state.quantityItems = state.items.length;
    },
    increaseQuantity(state, action: PayloadAction<{ id: number }>) {
      const itemExistInCart = state.items.find(
        (p) => p.id === action.payload.id,
      );

      if (itemExistInCart) {
        itemExistInCart.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<{ id: number }>) {
      const itemExistInCart = state.items.find(
        (p) => p.id === action.payload.id,
      );

      if (!itemExistInCart) return;

      if (itemExistInCart.quantity === 1) return;

      itemExistInCart.quantity -= 1;
    },
    deleteItem(state, action: PayloadAction<{ id: number }>) {
      const itemExistInCart = state.items.find(
        (p) => p.id === action.payload.id,
      );

      if (!itemExistInCart) return;

      state.items = state.items.filter((p) => p.id !== action.payload.id);
    },
    calculateTotalPrice(state) {
      const total = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      state.totalPrice = total;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  counterQuantityItems,
  calculateTotalPrice,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} = cartSlice.actions;
