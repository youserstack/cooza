import { Separator } from "@/components/ui/separator";

export default function ResponsiveSeparator() {
  return (
    <div className="self-stretch">
      <Separator orientation="horizontal" className="block sm:hidden" />
      <Separator orientation="vertical" className="hidden sm:block" />
    </div>
  );
}
