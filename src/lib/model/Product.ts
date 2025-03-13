import { Document, Schema, models, model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  link: string;
  image: string;
  lprice: number;
  hprice?: number | null;
  mallName: string;
  productId: string;
  productType: number;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3?: string;
  category4?: string;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    lprice: { type: Number, required: true },
    hprice: { type: Number, default: null }, // 빈 문자열 대신 null 허용
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

const Product = models.Product || model<IProduct>("Product", ProductSchema);
export default Product;
