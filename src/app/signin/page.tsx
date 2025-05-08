import { SignInForm } from "@/app/signin/sign-in-form";
import { ShipWheel } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="SignInPage">
      <section className="flex flex-col items-center justify-center">
        <div className="Box flex w-full max-w-sm flex-col gap-6">
          <Link href="#" className="flex items-center gap-1 self-center font-medium">
            <ShipWheel />
            Cooza Inc.
          </Link>

          <SignInForm />
        </div>
      </section>
    </main>
  );
}
