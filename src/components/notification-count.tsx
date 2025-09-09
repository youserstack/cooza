"use client";

import { useCartStore } from "@/lib/stores/useCartStore";
import dynamic from "next/dynamic";

function NotificationCount() {
  const quantity = useCartStore((state) => state.getTotalQuantity());

  if (!quantity) return null;

  return (
    <div
      className="absolute top-0 left-0 -translate-x-1/5 -translate-y-1/5
      size-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[8px]"
    >
      {quantity >= 100 ? "99+" : quantity}
    </div>
  );
}

export default dynamic(() => Promise.resolve(NotificationCount), { ssr: false });

// 하이드레이션 미스매치 해결법

// 1. 마운팅 체크 (useState + useEffect)
// 마운팅 체크 상태 -> useeffect에서 초기로드시 체크 -> 서버에서는 항상 useeffect가 실행되지 않음
// -> 서버에서 렌더링 안됨 -> 따라서 미스매치가 발생하지 않음

// "use client";

// import { useCartStore } from "@/lib/stores/useCartStore";
// import { useEffect, useState } from "react";

// export default function NotificationCount() {
//   // 서버/클라이언트 하이드레이션 미스매치를 방지하기위해서 -> 마운팅 체크
//   const [mounted, setMounted] = useState(false);

//   const { getTotalQuantity } = useCartStore();
//   const quantity = getTotalQuantity();

//   useEffect(() => {
//     setMounted(true); // 클라이언트 렌더링 후 true
//   }, []);

//   if (!mounted) return null; // 초기에는 아무것도 렌더링하지 않음

//   return (
//     <div
//       className="absolute top-0 left-0 -translate-x-1/5/ -translate-y-1/5/
//       size-4 rounded-full bg-red-500 text-white
//     flex items-center justify-center text-[8px]"
//     >
//       {quantity > 0 && quantity >= 100 ? "99+" : quantity}
//     </div>
//   );
// }

// 2. 다이나믹 임포트 (dynamic import + ssr false)
// 미스매치 발생할 것같은 클라이언트 컴포넌트를 부모 클라이언트 컴포넌트에서 다이나믹 임포트
// -> 이때 서버렌더링 false 설정하여 서버렌더링하지 않음으로 한다 -> 미스매치 발생하지 않음

// [src/components/notification-count.tsx]

// "use client";

// import { useCartStore } from "@/lib/stores/useCartStore";

// export default function NotificationCount() {
//   const { getTotalQuantity } = useCartStore();
//   const quantity = getTotalQuantity();

//   return (
//     <div
//       className="absolute top-0 left-0 -translate-x-1/5/ -translate-y-1/5/
//       size-4 rounded-full bg-red-500 text-white
//     flex items-center justify-center text-[8px]"
//     >
//       {quantity > 0 && quantity >= 100 ? "99+" : quantity}
//     </div>
//   );
// }

// [src/components/notification-count-wrapper.tsx]

// "use client";

// import dynamic from "next/dynamic";

// const NotificationCount = dynamic(() => import("@/components/notification-count"), {
//   ssr: false, // 서버 렌더링 안 함
// });

// export default function NotificationCountWrapper() {
//   return <NotificationCount />;
// }
