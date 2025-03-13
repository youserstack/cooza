import NextAuth from "next-auth";

declare module "next-auth" {
  interface User extends User {
    userId: string;
  }
  interface Session {
    user: {
      userId: string; // 추가된 필드
      name: string;
      email: string;
      image?: string;
    };
  }
}
