import { auth } from "@/auth";

export async function POST(req: Request) {
  const userId = await auth();
  const body = await req.json();
  console.log({ userId, body });

  return Response.json({ message: "test" });
}
