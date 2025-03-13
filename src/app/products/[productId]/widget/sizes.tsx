import { Button } from "@/components/ui/button";

const SIZES = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: false },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];

export default function Sizes() {
  return (
    <div className="Sizes">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">사이즈</h3>
        <a href="#" className="text-sm font-medium hover:underline">
          사이즈 안내
        </a>
      </div>

      <fieldset className="mt-4 flex gap-4 flex-wrap">
        {SIZES.map((size) => (
          <div key={size.name} className="flex relative">
            <input
              type="radio"
              name="size"
              id={size.name}
              value={size.name}
              disabled={!size.inStock}
              className="hidden peer"
            />
            <Button
              asChild
              variant="secondary"
              className="uppercase font-medium cursor-pointer
              peer-checked:ring-2 peer-checked:ring-foreground
              peer-disabled:opacity-30 peer-disabled:cursor-not-allowed"
            >
              <label htmlFor={size.name}>
                <div>{size.name}</div>
              </label>
            </Button>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
