import OrdersheetForm from "@/components/forms/ordersheet-form/ordersheet-form";
import { Stepper } from "@/components/stepper";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// 주문서 페이지
export default async function OrdersheetPage() {
  // 인증 확인
  const session = await auth();
  if (!session) redirect("/signin");

  return (
    <main>
      <section className="flex flex-col gap-4 px-4">
        <Stepper currentStep="checkout" />
        <OrdersheetForm />
      </section>
    </main>
  );
}
