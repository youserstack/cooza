import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  currentStep: "cart" | "checkout" | "complete";
}

export function Stepper({ currentStep }: Props) {
  return (
    <Breadcrumb className="BreadcrumbWithSeparator [&_li]:text-base">
      <BreadcrumbList>
        <BreadcrumbItem className={`${currentStep === "cart" ? "text-primary font-bold" : ""}`}>
          장바구니
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem className={`${currentStep === "checkout" ? "text-primary font-bold" : ""}`}>
          주문/결제
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem className={`${currentStep === "complete" ? "text-primary font-bold" : ""}`}>
          완료
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
