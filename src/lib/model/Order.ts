import { Document, Schema, models, model } from "mongoose";

export interface IOrder extends Document {
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

const OrderSchema: Schema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    productsInfo: [
      {
        mallName: { type: String, required: true },
        productId: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        options: {
          color: { type: String, required: true },
          size: { type: String, required: true },
          quantity: { type: Number, required: true, min: 1 },
        },
        price: { type: Number, required: true, min: 0 },
        total: { type: Number, required: true, min: 0 },
      },
    ],
    shippingInfo: {
      receiver: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      message: { type: String, default: "" },
    },
    paymentInfo: {
      mallName: { type: String, required: true },
      method: { type: String, required: true },
      amount: { type: Number, required: true, min: 0 },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "canceled"],
      default: "pending",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

const Order = models.Order || model<IOrder>("Order", OrderSchema);
export default Order;
