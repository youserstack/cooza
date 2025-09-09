import { Schema, models, model, InferSchemaType } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    lprice: { type: Number, required: true },
    mallName: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    productType: { type: Number, required: true },
    brand: { type: String, required: true },
    maker: { type: String, required: true },
    category1: { type: String, required: true },
    category2: { type: String, required: true },
    category3: { type: String },
    category4: { type: String },
  },
  {
    timestamps: true,
  }
);

export type ProductType = InferSchemaType<typeof ProductSchema>; // 자동 추론
const Product = models.Product || model<ProductType>("Product", ProductSchema);

export default Product;
