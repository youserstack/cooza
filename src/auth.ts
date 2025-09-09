import db from "@/lib/configs/db";
import User from "@/lib/model/User";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import { Account, Profile, User as NextAuthUser } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Naver],
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/signin" }, // 커스텀 로그인 페이지 경로 지정
  callbacks: {
    async signIn({ user, account, profile }) {
      await db();

      if (!account) {
        return false;
      } else {
        console.log({ account });
        return true;
      }
    },
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
});
