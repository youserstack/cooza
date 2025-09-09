import { z } from "zod";

export const cartSchema = z.object({
  color: z.string(),
  size: z.string(),
  quantity: z.number(),
});

export type CartSchema = z.infer<typeof cartSchema>;
