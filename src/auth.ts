import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/configs/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma as PrismaClient),
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/signin" }, // 커스텀 로그인 페이지 경로 지정
  providers: [Google, Naver],
  session: { strategy: "jwt" }, // 서버에서 인증관리하지않고 클라이언트에서 토큰으로 인증관리
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log({ user });
      if (!account) {
        // console.log("account 없음");
        return false;
      } else {
        // console.log("account 있음");
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      // console.log({ user, token });

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      // console.log({ session });

      return session;
    },
  },
});
