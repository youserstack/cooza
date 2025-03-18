"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import PaymentInfoCard from "@/app/ordersheet/payment-info-card";
import ProductInfoCard from "@/app/ordersheet/product-info-card";
import ShippingInfoCard from "@/app/ordersheet/shipping-info-card";
import { useOrdersheetStore } from "@/lib/stores/useOrdersheetStore";
import { useEffect } from "react";

export const formSchema = z.object({
  receiver: z.string().nonempty({ message: "" }),
  address: z.string().nonempty({ message: "" }),
  phone: z
    .string()
    .nonempty({ message: "" })
    .regex(/^\d{3}-\d{3,4}-\d{4}$/, {
      message: "전화번호 형식이 올바르지 않습니다. 000-0000-0000",
    }),
  message: z.string().optional(),
  method: z.string().nonempty({ message: "" }),
  paymentTiming: z.string().nonempty({ message: "" }),
});

export default function OrdersheetForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver: "",
      address: "",
      phone: "",
      message: "",
      method: "",
      paymentTiming: "",
    },
  });

  const { productsInfo, shippingInfo, paymentInfo } = useOrdersheetStore();

  useEffect(() => {
    form.reset({
      receiver: shippingInfo.receiver,
      address: shippingInfo.address,
      phone: shippingInfo.phone,
      message: shippingInfo.message,
      method: paymentInfo.method,
      paymentTiming: paymentInfo.paymentTiming,
    });
  }, [shippingInfo, paymentInfo, productsInfo]);

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
