import { Stepper } from "@/components/stepper";
import OrdersheetForm from "@/app/ordersheet/ordersheet-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OrdersheetPage() {
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
