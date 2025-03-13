import { handlers } from "@/app/api/auth/[...nextauth]/auth"; // auth.ts에서 가져옴

export const { GET, POST } = handlers;
