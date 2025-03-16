"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useOrdersheetStore } from "@/lib/stores/useOrdersheetStore";
import { CreditCard, Info } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Ordersheet, OrdersheetForm } from "@/types/ordersheet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
// import { formSchema } from "@/app/ordersheet/ordersheet-form";
// import { z } from "zod";
// import { auth } from "@/app/api/auth/[...nextauth]/auth";
// import { IOrder } from "@/lib/model/Order";

interface Props {
  form: OrdersheetForm;
}

export default function PaymentInfoCard({ form }: Props) {
  const { data: session } = useSession();
  const { productsInfo, shippingInfo, paymentInfo, setPaymentInfo } = useOrdersheetStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleOrder = async () => {
    try {
      if (!session) throw new Error("로그인 후 주문가능합니다.");

      // extract
      // const values = form.getValues();
      const ordersheet: Ordersheet = {
        userId: session.user.userId,
        productsInfo,
        shippingInfo,
        paymentInfo: {
          mallName: paymentInfo.mallName,
          method: paymentInfo.method,
          amount: paymentInfo.amount,
          paymentStatus: paymentInfo.paymentTiming === "prepaid-payment" ? "paid" : "pending",
        },
        status: "pending",
      };
      console.log({ ordersheet });
      // return;

      const res = await fetch("/api/orders", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ordersheet),
      });
      if (!res.ok) throw new Error("주문에러");
      toast.info(`${ordersheet.paymentInfo.mallName}에서 구매가 완료되었습니다.`);
      router.push("/orders");
      // const data = await res.json();
      // console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // submit handler
  // const onValid: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
  //   setIsDialogOpen(true);
  //   console.log("유효한 데이터", data);
  // };
  // const onInvalid: SubmitErrorHandler<z.infer<typeof formSchema>> = (errors) => {
  //   console.error("요휴성 에러", errors);
  //   toast.error("필수사항을 입력해주세요.");
  // };
  // const handleSubmit = form.handleSubmit(onValid, onInvalid);

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
                    field.onChange(value);
                    setPaymentInfo({ method: value });
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
                    field.onChange(value);
                    setPaymentInfo({ paymentTiming: value });
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
            <Button
              className="w-full h-fit bg-green-500 text-lg font-semibold flex whitespace-break-spaces"
              // onClick={handleSubmit}
              onClick={form.handleSubmit(
                (data) => {
                  setIsDialogOpen(true);
                },
                (err) => {
                  toast.error("필수사항을 입력해주세요.");
                }
              )}
            >
              {paymentInfo.amount} 원 결제하기
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
                {paymentInfo.amount} 원 결제하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
