const COLORS = [
  { name: "black", ring: "ring-zinc-800 /ring-black", bg: "bg-black" },
  { name: "white", ring: "ring-black/30 dark:ring-white", bg: "bg-white" },
  { name: "red", ring: "ring-red-500", bg: "bg-red-500" },
  { name: "orange", ring: "ring-orange-500", bg: "bg-orange-500" },
  { name: "yellow", ring: "ring-yellow-500", bg: "bg-yellow-500" },
  { name: "green", ring: "ring-green-500", bg: "bg-green-500" },
  { name: "blue", ring: "ring-blue-500", bg: "bg-blue-500" },
  { name: "purple", ring: "ring-purple-500", bg: "bg-purple-500" },
  { name: "pink", ring: "ring-pink-500", bg: "bg-pink-500" },
  { name: "gray", ring: "ring-gray-500", bg: "bg-gray-500" },
];

export default function Colors() {
  return (
    <div className="Colors">
      <h3 className="text-sm font-medium">색상</h3>

      <fieldset className="mt-4">
        <div className="flex items-center gap-2 flex-wrap">
          {COLORS.map((color) => (
            <div key={color.name} className="flex items-center bg-black/">
              <input
                type="radio"
                name="color"
                id={color.name}
                value={color.name}
                className="peer sr-only"
                // className="peer hidden"
              />

              <label
                htmlFor={color.name}
                // 아웃사이드 링
                // 패딩으로 링사이 간격조절
                className={`Outer_Round p-[2px] rounded-full peer-checked:ring-2 ${color.ring}`}
              >
                <div
                  // 인사이드 링
                  className={`Inner_Round w-8 h-8 border rounded-full cursor-pointer ${color.bg} `}
                />
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
