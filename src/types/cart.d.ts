type OptionType = {
  color: string;
  size: string;
  quantity: number;
};

type CartItemType = {
  id: string;
  product: ProductType;
  option: OptionType;
};

type CartListType = CartItemType[];

type CartStoreType = {
  cartList: CartListType;
} & {
  addToCart: (item: Omit<CartItemType, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
};
