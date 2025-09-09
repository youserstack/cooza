import { Schema, models, model, InferSchemaType } from "mongoose";

const OrderSchema = new Schema(
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

export type OrderType = InferSchemaType<typeof OrderSchema>; // 자동 추론
const Order = models.Order || model<OrderType>("Order", OrderSchema);
export default Order;
