import * as z from "zod";

export const ordersheetSchema = z.object({
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

export type OrdersheetSchemaType = z.infer<typeof ordersheetSchema>;
