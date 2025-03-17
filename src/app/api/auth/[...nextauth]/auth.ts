import db from "@/lib/configs/db";
import User from "@/lib/model/User";
import NextAuth from "next-auth";
import Naver from "next-auth/providers/naver";
import { v4 as uuidv4 } from "uuid";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Naver],
  // pages: { signIn: "/signin" }, // 커스텀 로그인 페이지 경로 지정
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await db();

        console.log({ user, account, profile });

        if (!account) {
          console.log("account 정보가 없습니다.");
          return false;
        }

        if (account.provider !== "naver") {
          console.log("현재 naver 로그인만 제공됩니다.");
          return false;
        }

        const foundUser = await User.findOne({ providerId: account.providerAccountId });
        if (!foundUser) {
          const userId = uuidv4();

          const newUser = await User.create({
            userId,
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "naver",
            providerId: account.providerAccountId,
          });

          user.userId = userId;
          console.log({ newUser }, "신규가입으로 로그인처리");
        } else {
          user.userId = foundUser.userId;
          console.log({ foundUser }, "기존가입으로 로그인처리");
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // console.log("jwt", { token, user });

      if (user) {
        token.userId = user.userId;
      }

      return token;
    },

    async session({ session, token }) {
      // console.log("session", { session, token });

      if (session.user && token.userId) {
        session.user.userId = token.userId as string;
      }

      return session;
    },

    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
  },
  secret: process.env.AUTH_SECRET,
});
