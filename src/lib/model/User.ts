import { Schema, models, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    // provider: { type: String, required: true }, // 네이버, 구글 등 OAuth 제공자 정보
    // providerId: { type: String, required: true, unique: true }, // 네이버에서 받은 고유 ID
    provider: { type: [String], required: true }, // ✅ 사용한 로그인 제공자 목록
    providerIds: { type: Map, of: String }, // ✅ { "naver": "naver-123", "google": "google-456" }
  },
  {
    timestamps: true,
  }
);

export type UserType = InferSchemaType<typeof UserSchema>;
const User = models.User || model<UserType>("User", UserSchema);

export default User;
