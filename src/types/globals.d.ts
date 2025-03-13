/*
  제품 관련 타입
*/

interface Product {
  title: string;
  link: string;
  image: string;
  lprice: string;
  hprice: string;
  mallName: string;
  productId: string;
  productType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

/* 
  장바구니(카트) 관련 타입
*/

interface Item {
  mallName: string;
  productId: string;
  name: string;
  image: string;
  options: {
    color: string;
    size: string;
    quantity: number;
  };
  price: number;
  total: number;
}

interface Group {
  mallName: string;
  items: Item[];
  groupTotal: number;
}

/*
  주문서 관련 타입
*/

type ProductsInfo = Item[];

interface ShippingInfo {
  receiver: string;
  address: string;
  phone: string;
  message: string;
}

interface PaymentInfo {
  mallName: string;
  method: string;
  paymentTiming: string;
  amount: number;
}

/*
  주문 관련 타입
*/

interface Order {
  orderId: string;
  userId: string;
  productsInfo: ProductsInfo;
  shippingInfo: ShippingInfo;
  paymentInfo: {
    mallName: string;
    method: string;
    amount: number;
    paymentStatus: "pending" | "paid" | "failed"; // 결제 상태
  };
  status: "pending" | "shipped" | "delivered" | "canceled"; // 주문 상태
}
