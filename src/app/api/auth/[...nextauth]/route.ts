// import { handlers } from "@/app/api/auth/[...nextauth]/auth"; // auth.ts에서 가져옴
// export const { GET, POST } = handlers;

// app/api/auth/[...nextauth]/route.ts
import { GET as AuthGET, POST as AuthPOST } from "@/app/api/auth/[...nextauth]/auth";
import { naverFetchInterceptor } from "@/app/api/auth/[...nextauth]/naverFetchInterceptor";
import { type NextRequest } from "next/server";

const originalFetch = fetch;

export async function POST(req: NextRequest) {
  return await AuthPOST(req);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  if (url.pathname === "/api/auth/callback/naver") {
    global.fetch = naverFetchInterceptor(originalFetch);
    const response = await AuthGET(req);
    global.fetch = originalFetch;
    return response;
  }
  return await AuthGET(req);
}
