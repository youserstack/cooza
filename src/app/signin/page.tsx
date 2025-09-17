import { SignInForm } from "@/components/sign-in-form";
import { ShipWheel } from "lucide-react";
import Link from "next/link";

// 로그인 페이지
export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const queryParams = await props.searchParams;
  const callbackUrl = queryParams.callbackUrl ?? "/";
  // console.log({ callbackUrl });

  return (
    <main>
      <section className="flex flex-col items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href="#" className="flex items-center gap-1 self-center font-medium">
            <ShipWheel />
            Cooza Inc.
          </Link>

          <SignInForm callbackUrl={callbackUrl} />
        </div>
      </section>
    </main>
  );
}
