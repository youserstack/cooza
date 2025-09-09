"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrdersheetSchemaType } from "@/lib/schemas/ordersheet-schema";
import { useOrdersheetStore } from "@/lib/stores/useOrdersheetStore";
import { Separator } from "@/components/ui/separator";
import { createOrder } from "@/lib/fetchers/order";
import { CreditCard, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PaymentInfoCard({ form }: { form: UseFormReturn<OrdersheetSchemaType> }) {
  const { data: session } = useSession();
  const {} = useOrdersheetStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleOrder = async () => {
    try {
      const ordersheet = {};
      console.log({ ordersheet });

      await createOrder(ordersheet);

      router.push("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard />
          <span>결제상세</span>
        </CardTitle>
        <Separator className="mt-1" />
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="mb-0">
                결제방식
                <Info className="size-4" />
              </FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value} // react-hook-form과 상태 동기화
                  onValueChange={(value) => {
                    // field.onChange(value);
                    // setPaymentInfo({ method: value });
                  }}
                  className="flex flex-col gap-2 ml-2"
                >
                  {[
                    ["충전 간편결제", "recharge-payment"],
                    ["계좌 간편결제", "easybank-payment"],
                    ["카드 간편결제", "easycard-payment"],
                    ["일반결제", "general-payment"],
                  ].map(([label, value]) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={value}>
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentTiming"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="mb-0">
                결제시기
                <Info className="size-4" />
              </FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value} // react-hook-form과 상태 동기화
                  onValueChange={(value) => {
                    // field.onChange(value);
                    // setPaymentInfo({ paymentTiming: value });
                  }}
                  className="flex flex-col gap-2 ml-2"
                >
                  {[
                    ["선불 결제", "prepaid-payment"],
                    ["후불 결제", "postpaid-payment"],
                  ].map(([label, value]) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={value}>
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>

      <CardFooter className="mt-8">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full h-fit bg-green-500 text-lg font-semibold flex whitespace-break-spaces">
              {/* {paymentInfo.amount} 원 결제하기 */}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>결제</DialogTitle>
            </DialogHeader>

            <DialogDescription>가상으로 결제가 됩니다. 결제하시겠습니까?</DialogDescription>

            <DialogFooter>
              <Button
                className="bg-green-500 text-lg font-semibold flex "
                size="lg"
                onClick={handleOrder}
              >
                {/* {paymentInfo.amount} 원 결제하기 */}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
