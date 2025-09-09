import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

export const useCartStore = create<CartStoreType>()(
  persist(
    immer((set, get) => ({
      // 카트아이템리스트
      cartList: [],

      // 추가
      addToCart: (item) =>
        set((state) => {
          // 중복체크 -> 수량변경/아이템추가
          const found = state.cartList.find(
            (v) =>
              v.product.productId === item.product.productId &&
              v.option.color === item.option.color &&
              v.option.size === item.option.size
          );

          if (found) {
            // 수량++
            console.log("수량변경");
            found.option.quantity += item.option.quantity;
          } else {
            // 아이템추가
            console.log("아이템추가");
            state.cartList.push({ ...item, id: crypto.randomUUID() });
          }
        }),

      // 수정
      updateQuantity: (id, quantity) =>
        set((state) => {
          const found = state.cartList.find((v) => v.id === id);
          if (found) found.option.quantity = quantity;
        }),

      // 삭제
      removeFromCart: (id) =>
        set((state) => {
          state.cartList = state.cartList.filter((v) => v.id !== id);
        }),

      // 초기화
      clearCart: () => set(() => ({ cartList: [] })),

      // // 전체 카트아이템 가격
      // getTotalPrice: () => {
      //   return get().cartList.reduce((sum, v) => sum + v.product.price * v.option.quantity, 0);
      // },

      // 전체 카트아이템 갯수
      getTotalQuantity: () => {
        return get().cartList.reduce((sum, v) => sum + v.option.quantity, 0);
      },
    })),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
