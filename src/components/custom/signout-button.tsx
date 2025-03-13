import { signOut } from "@/app/api/auth/[...nextauth]/auth";
import { Button } from "@/components/ui/button";

export default function SignoutButton() {
  const action = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <form action={action}>
      <Button type="submit">로그아웃</Button>
    </form>
  );
}
