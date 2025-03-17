import { LoginForm } from "@/components/custom/login-form";
import { ShipWheel } from "lucide-react";
import Link from "next/link";

export default function SigninPage() {
  return (
    <main className="SigninPage">
      <section className="flex flex-col items-center justify-center">
        <Box />
      </section>
    </main>
  );
}

function Box() {
  return (
    <div className="Box flex w-full max-w-sm flex-col gap-6">
      <Link href="#" className="flex items-center gap-1 self-center font-medium">
        <ShipWheel />
        Cooza Inc.
        {/* <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        </div> */}
      </Link>

      <LoginForm />
    </div>
  );
}
