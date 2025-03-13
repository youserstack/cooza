import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info, Truck } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OrdersheetForm } from "@/types/ordersheet";
import { useOrdersheetStore } from "@/lib/stores/useOrdersheetStore";

export default function ShippingInfoCard({ form }: { form: OrdersheetForm }) {
  const { setShippingInfo } = useOrdersheetStore();

  return (
    <Card className="ShippingInfoCard">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck />
          <span>배송지</span>
        </CardTitle>
        <Separator className="mt-1" />
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="receiver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>수령인</span>
                <Info className="size-4" />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="text"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setShippingInfo({ receiver: e.target.value });
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>주소</span>
                <Info className="size-4" />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="text"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setShippingInfo({ address: e.target.value });
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>전화번호</span>
                <Info className="size-4" />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="000-0000-0000"
                  type="text"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setShippingInfo({ phone: e.target.value });
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>배송메세지(선택사항)</span>
                <Info className="size-4" />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="요청사항을 입력하세요."
                  className="resize-none"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setShippingInfo({ message: e.target.value });
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
