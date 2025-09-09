type PaymentType = {
  price: number;
  total: number;
  mallName: string;
  method: string;
  paymentTiming: string;
  amount: number;
};

type ShippingType = {
  receiver: string;
  address: string;
  phone: string;
  message: string;
};

type OrdersheetStateType = {
  cartList: CartListType;
  payment: PaymentType;
  shipping: ShippingType;
};

type OrdersheetMethodsType = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (index: number) => void;
  updatePayment: (payment: Partial<PaymentType>) => void;
  updateShipping: (shipping: Partial<ShippingType>) => void;
  resetOrdersheet: () => void;
};

type OrdersheetStoreType = OrdersheetStateType & OrdersheetMethodsType;
