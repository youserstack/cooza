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
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) {
        return false;
      } else {
        console.log({ account });
        return true;
      }
    },
    async jwt({ token, user }) {
      console.log({ user, token });
      return token;
    },
    async session({ session, token }) {
      console.log({ session, token });
      return session;
    },
  },
});
