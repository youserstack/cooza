import { Document, Schema, models, model } from "mongoose";

export interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  image: string;
  provider: string; // OAuth 제공자 정보 (예: "naver")
  providerId: string; // OAuth에서 제공하는 사용자 고유 ID
}

const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    provider: { type: String, required: true }, // 네이버, 구글 등 OAuth 제공자 정보
    providerId: { type: String, required: true, unique: true }, // 네이버에서 받은 고유 ID
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
