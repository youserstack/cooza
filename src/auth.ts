import db from "@/lib/configs/db";
import User from "@/lib/model/User";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import { v4 as uuidv4 } from "uuid";
import { Account, Profile, User as NextAuthUser } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Naver],
  pages: { signIn: "/signin" }, // 커스텀 로그인 페이지 경로 지정
  callbacks: {
    async signIn({ user, account, profile }) {
      await db();
      console.log({ user, account, profile });

      if (!account) {
        console.log("account 정보가 없습니다.");
        return false;
      }

      switch (account.provider) {
        case "naver":
          return handleNaverSignIn(user, account);
        case "google":
          console.log("google signin");
          return true;
        // return handleGoogleSignIn(user, account);
        default:
          console.log("현재 naver, google 로그인만 제공됩니다.");
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

/**
 * ✅ Naver 로그인 처리 함수
 */
async function handleNaverSignIn(user: NextAuthUser, account: Account): Promise<boolean> {
  return handleOAuthSignIn(user, account, "naver");
}

/**
 * ✅ Google 로그인 처리 함수
 */
async function handleGoogleSignIn(user: NextAuthUser, account: Account): Promise<boolean> {
  return handleOAuthSignIn(user, account, "google");
}

/**
 * ✅ 공통 OAuth 로그인 처리 함수
 */
async function handleOAuthSignIn(
  user: NextAuthUser,
  account: Account,
  provider: "naver" | "google"
): Promise<boolean> {
  try {
    const foundUser = await User.findOne({ providerId: account.providerAccountId });

    if (!foundUser) {
      const userId = uuidv4();

      const newUser = await User.create({
        userId,
        name: user.name,
        email: user.email,
        image: user.image,
        provider,
        providerId: account.providerAccountId,
      });

      (user as any).userId = userId;
      console.log({ newUser }, `신규가입(${provider})으로 로그인처리`);
    } else {
      (user as any).userId = foundUser.userId;
      console.log({ foundUser }, `기존가입(${provider})으로 로그인처리`);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// try {
//   const foundUser = await User.findOne({ providerId: account.providerAccountId });
//   if (!foundUser) {
//     const userId = uuidv4();

//     const newUser = await User.create({
//       userId,
//       name: user.name,
//       email: user.email,
//       image: user.image,
//       provider: "naver",
//       providerId: account.providerAccountId,
//     });

//     user.userId = userId;
//     console.log({ newUser }, "신규가입으로 로그인처리");
//   } else {
//     user.userId = foundUser.userId;
//     console.log({ foundUser }, "기존가입으로 로그인처리");
//   }

//   return true;
// } catch (error) {
//   console.log(error);
//   return false;
// }
