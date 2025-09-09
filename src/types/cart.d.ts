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

type CartStateType = {
  cartList: CartListType;
};

type CartMethodsType = {
  addToCart: (item: Omit<CartItemType, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
};

type CartStoreType = CartStateType & CartMethodsType;
