import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

export const useOrdersheetStore = create<OrdersheetStoreType>()(
  persist(
    immer((set) => ({
      // 주문서 상태
      cartList: [],
      payment: {
        price: 0,
        total: 0,
        mallName: "",
        method: "",
        paymentTiming: "",
        amount: 0,
      },
      shipping: {
        receiver: "",
        address: "",
        phone: "",
        message: "",
      },

      // ✅ 카트에 아이템 추가
      addToCart: (item) =>
        set((state) => {
          state.cartList.push(item);
        }),

      // ✅ 카트에서 아이템 제거
      removeFromCart: (index) =>
        set((state) => {
          state.cartList.splice(index, 1);
        }),

      // ✅ 결제 정보 업데이트
      updatePayment: (payment) =>
        set((state) => {
          state.payment = { ...state.payment, ...payment };
        }),

      // ✅ 배송 정보 업데이트
      updateShipping: (shipping) =>
        set((state) => {
          state.shipping = { ...state.shipping, ...shipping };
        }),

      // ✅ 초기화
      resetOrdersheet: () => set(() => {}),
    })),
    {
      name: "ordersheet-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
