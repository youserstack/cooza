import { handlers } from "@/app/api/auth/[...nextauth]/auth"; // auth.ts에서 가져옴
import db from "@/lib/configs/db";

async function connect() {
  // DB 연결 로그
  console.log("DB 연결 시작...");
  await db();
  console.log("DB 연결 성공.");
}

connect();

export const { GET, POST } = handlers;
