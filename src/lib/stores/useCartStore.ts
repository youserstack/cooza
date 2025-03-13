import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface CartStore {
  groups: Group[];
  addToCart: (newItem: Item) => void;
  updateCartItem: (updatedItem: Item) => void;
  removeCartItem: (removedItem: Item) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    immer((set, get) => ({
      // 장바구니 아이템 목록
      groups: [],

      // 추가
      addToCart: (newItem) => {
        set((state) => {
          // 동일한 mallName을 가진 그룹 찾기
          const foundGroup = state.groups.find((group) => group.mallName === newItem.mallName);

          // 기존 그룹에 추가
          if (foundGroup) {
            // 같은 productId와 같은 옵션(color, size)을 가진 아이템 찾기
            const foundItem = foundGroup.items.find(
              (item) =>
                item.productId === newItem.productId &&
                item.options.color === newItem.options.color &&
                item.options.size === newItem.options.size
            );

            if (foundItem) {
              // 기존 아이템의 수량과 총 가격을 업데이트
              foundItem.options.quantity += newItem.options.quantity;
              foundItem.total += newItem.total;
            } else {
              // 새로운 상품 추가
              foundGroup.items.push(newItem);
            }

            // 그룹 총액 업데이트
            foundGroup.groupTotal += newItem.total;
          }
          // 새로운 그룹 추가
          else {
            state.groups.push({
              mallName: newItem.mallName,
              items: [newItem],
              groupTotal: newItem.total,
            });
          }
        });
      },

      // 수정
      updateCartItem: (updatedItem) => {
        set((state) => {
          for (const group of state.groups) {
            const foundItem = group.items.find(
              (item) =>
                item.productId === updatedItem.productId &&
                item.options.color === updatedItem.options.color &&
                item.options.size === updatedItem.options.size
            );

            // 수량만 변경
            if (foundItem) {
              const quantityDiff = updatedItem.options.quantity - foundItem.options.quantity;
              const totalDiff = quantityDiff * foundItem.price;

              foundItem.options.quantity = updatedItem.options.quantity;
              foundItem.total += totalDiff;
              group.groupTotal += totalDiff;
              return;
            }

            // color 또는 size 변경된 경우 기존 아이템 삭제 후 새로운 아이템 추가
            const originalItem = group.items.find(
              (item) => item.productId === updatedItem.productId
            );

            if (originalItem) {
              // 기존 아이템을 제거
              group.items = group.items.filter((item) => item.productId !== updatedItem.productId);
              group.groupTotal -= originalItem.total;

              // 새로운 아이템 추가
              group.items.push(updatedItem);
              group.groupTotal += updatedItem.total;
              return;
            }
          }
        });
      },

      // 삭제
      removeCartItem: (removedItem) => {
        set((state) => {
          state.groups.forEach((group, groupIndex) => {
            const foundItem = group.items.find(
              (item) =>
                item.productId === removedItem.productId &&
                item.options.color === removedItem.options.color &&
                item.options.size === removedItem.options.size
            );

            if (foundItem) {
              const itemTotal = foundItem.total;

              // 해당 아이템 삭제
              group.items = group.items.filter((item) => item !== foundItem);

              group.groupTotal -= itemTotal;

              // 아이템이 없다면 그룹 삭제
              if (group.items.length === 0) {
                state.groups.splice(groupIndex, 1);
              }
            }
          });
        });
      },

      // 장바구니 비우기
      clearCart: () => {
        set((state) => {
          state.groups = [];
        });
      },
    })),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage), // 기본적으로는 'localStorage'가 사용됨
      // partialize: (state) => ({ items: state.items }), // 저장할 상태를 제한
    }
  )
);
