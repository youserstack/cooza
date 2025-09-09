"use client";

import { ordersheetSchema, OrdersheetSchemaType } from "@/lib/schemas/ordersheet-schema";
import { useOrdersheetStore } from "@/lib/stores/useOrdersheetStore";
import ShippingInfoCard from "@/components/forms/ordersheet-form/shipping-info-card";
import PaymentInfoCard from "@/components/forms/ordersheet-form/payment-info-card";
import ProductInfoCard from "@/components/forms/ordersheet-form/product-info-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

export default function OrdersheetForm() {
  const form = useForm<OrdersheetSchemaType>({
    resolver: zodResolver(ordersheetSchema),
    defaultValues: {
      receiver: "",
      address: "",
      phone: "",
      message: "",
      method: "",
      paymentTiming: "",
    },
  });

  const {} = useOrdersheetStore();

  return (
    <Form {...form}>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4">
          <div className="col-span-2 flex flex-col gap-4">
            <ShippingInfoCard form={form} />
            <ProductInfoCard />
          </div>

          <div className="self-start sm:sticky top-8">
            <PaymentInfoCard form={form} />
          </div>
        </div>
      </form>
    </Form>
  );
}
