import db from "@/lib/configs/db";
import User from "@/lib/model/User";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import { v4 as uuidv4 } from "uuid";
import { Account, Profile, User as NextAuthUser } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Naver],
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/signin" }, // 커스텀 로그인 페이지 경로 지정
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(
        "☑️ api/auth/[...nextauth]/route > signIn callback : provider(google, naver) 인증/인가 처리"
      );
      console.log("✔️ 프로바이더에서 제공한 데이터", { user, account, profile });

      await db();

      // ⚪ 예외처리
      if (!account) {
        console.log("❌ account 정보가 없습니다.");
        return false;
      }

      // ⚪ 프로바이더에 따라서 처리
      switch (account.provider) {
        case "google":
          console.log("✔️ 넥스트서버에서 구글로그인 처리중...");
          return await handleOAuthSignIn(user, account, "google");
        case "naver":
          console.log("✔️ 넥스트서버에서 네이버로그인 처리중...");
          return await handleOAuthSignIn(user, account, "naver");
        default:
          console.log("❌ naver, google 로그인만 제공됩니다.");
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
  },
});

async function handleOAuthSignIn(
  user: NextAuthUser,
  account: Account,
  provider: "naver" | "google"
): Promise<boolean> {
  try {
    // ⚪ 프로바이더 아이디로 먼저 조회
    let foundUser = await User.findOne({ [`providerIds.${provider}`]: account.providerAccountId });

    // ⚪ 프로바이더 아이디로 찾지 못하면 email로 조회
    if (!foundUser && user.email) {
      foundUser = await User.findOne({ email: user.email });
      if (foundUser) {
        console.log(`✔️ 기존 이메일(${user.email})과 연동하여 providerId 업데이트`);
        foundUser.provider.push(provider);
        foundUser.providerIds.set(provider, account.providerAccountId);
        await foundUser.save();
      }
    }

    // ⚪ 미가입자는 신규가입으로 처리
    if (!foundUser) {
      const userId = uuidv4();
      const newUser = await User.create({
        userId,
        name: user.name,
        email: user.email,
        image: user.image,
        provider: [provider], // 첫 로그인이라 하나만 저장
        providerIds: { [provider]: account.providerAccountId }, // 첫 로그인 providerId 저장
      });

      user.userId = userId;
      console.log({ newUser }, `🟢 신규가입(${provider})으로 로그인 처리`);
    }

    // ⚪ 기존가입자는 바로 처리
    else {
      user.userId = foundUser.userId;
      console.log({ foundUser }, `🟢 기존가입(${provider})으로 로그인 처리`);
    }

    return true;
  } catch (error) {
    console.log("❌ Oauth 로그인에러", error);
    return false;
  }
}
