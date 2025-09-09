type OrderedType = {
  // 주문정보 -> 주문아이디/회원아이디/주문상태
  orderId: string;
  userId: string;
  status: "pending" | "shipped" | "delivered" | "canceled";

  // 카트리스트 -> 제품정보 + 수량/옵션
  cartList: CartListType;

  // 결제정보 -> 결제상태
  payment: PaymentType & {
    paymentStatus: "pending" | "paid" | "failed";
  };

  // 배송정보
  shipping: ShippingType;
};
