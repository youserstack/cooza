// type ProductType = {
//   title: string;
//   link: string;
//   image: string;
//   price: number;
//   mallName: string;
//   productId: string;
//   productType: string;
//   brand: string;
//   maker: string;
//   category1: string;
//   category2: string;
//   category3: string;
//   category4: string;

//   lprice: number; //임시
// };

// globals.d.ts

// Prisma 모델을 기반으로 한 타입 정의
// interface ❌ -> type ✅

type User = {
  id: string;
  email: string;
  name?: string | null;

  // 관계
  carts: Cart[];
};

type Cart = {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // 관계
  userId: string;
  user: User;
  items: CartItem[];
};

type CartItem = {
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;

  // 관계
  cartId: string;
  cart: Cart;
  productId: string;
  product: Product;
};

type ProductType = {
  id: string;
  name: string;
  maker: string;
  description?: string | null;
  image: string;
  seller: string;
  category: string[];
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;

  // 관계
  // cartItems: CartItem[];
};
