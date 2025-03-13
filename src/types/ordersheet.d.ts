import { formSchema } from "@/app/ordersheet/ordersheet-form";
import { IOrder } from "@/lib/model/Order";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

/*
  결제 관련 타입
*/

type OrdersheetForm = UseFormReturn<z.infer<typeof formSchema>>;

type Ordersheet = Pick<
  IOrder,
  "userId" | "productsInfo" | "shippingInfo" | "paymentInfo" | "status"
>;
