import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface OrdersheetStore {
  productsInfo: ProductsInfo;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;

  setProductsInfo: (info: ProductsInfo) => void;
  setShippingInfo: (info: Partial<ShippingInfo>) => void;
  setPaymentInfo: (info: Partial<PaymentInfo>) => void;
}

export const useOrdersheetStore = create<OrdersheetStore>()(
  persist(
    immer((set) => ({
      productsInfo: [],
      shippingInfo: { receiver: "", address: "", phone: "", message: "" },
      paymentInfo: { mallName: "", method: "", paymentTiming: "", amount: 0 },

      setProductsInfo: (info) => {
        set((state) => {
          state.productsInfo = info;
        });
      },
      setShippingInfo: (info) => {
        set((state) => {
          state.shippingInfo = { ...state.shippingInfo, ...info };
        });
      },
      setPaymentInfo: (info) => {
        set((state) => {
          state.paymentInfo = { ...state.paymentInfo, ...info };
        });
      },
    })),
    {
      name: "ordersheet-storage", // 저장소 키 이름 (sessionStorage 또는 localStorage에 저장될 키)
      storage: createJSONStorage(() => sessionStorage), // sessionStorage를 저장소로 사용
    }
  )
);
