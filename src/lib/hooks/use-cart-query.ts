import { useQuery } from "@tanstack/react-query";

// 사용자 아이디 -> 카트 정보 서버에 요청
export function useCartQuery() {
  return useQuery({
    queryKey: ["cart"],
    // queryFn: () => getsome(),
  });
}
