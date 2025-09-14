"use client";

import { Next, NextJump, Prev, PrevJump } from "@/components/buttons/pagination-buttons";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 페이지당 페이지넘버의 수 -> 페이지넘버버튼(Button)의 수 -> pageNums의 수
const numbersPerPage = 10;

// 서버컴포넌트로부터 전체페이지수를 입력받는다.
export default function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const queryParams = useSearchParams();

  // 현재페이지넘버
  const page = Number(queryParams.get("page")) || 1;

  // 시작 페이지넘버와 끝 페이지넘버 계산
  // 예: page=15, numbersPerPage=10 → startNum=11, endNum=20
  const startNum = Math.floor((page - 1) / numbersPerPage) * numbersPerPage + 1;
  const endNum = Math.min(startNum + numbersPerPage - 1, totalPages);

  // 페이지넘버 배열 생성
  const pageNums = Array.from({ length: endNum - startNum + 1 }, (_, i) => startNum + i);

  // 페이지넘버 계산
  const prevJumpPage = Math.max(startNum - numbersPerPage, 1);
  const prevPage = Math.max(page - 1, 1);
  const nextPage = Math.min(page + 1, totalPages);
  const nextJumpPage = Math.min(endNum + 1, totalPages);

  const updatePage = (page: number) => {
    const params = new URLSearchParams(queryParams);
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  if (!pageNums.length) return null;

  return (
    <div className="flex flex-wrap justify-center items-center my-10 sm:my-15 md:my-20">
      {/* 이전 블록 점프 */}
      <PrevJump onClick={() => updatePage(prevJumpPage)} disabled={startNum <= 1} />
      {/* 이전 페이지 */}
      <Prev onClick={() => updatePage(prevPage)} disabled={page <= 1} />
      {/* 페이지넘버 리스트 */}
      {pageNums.map((num) => (
        <Button
          key={num}
          variant={"ghost"}
          size={"icon"}
          onClick={() => updatePage(num)}
          className={cn("m-1 rounded-full", { "text-blue-500 font-semibold": num === page })}
        >
          {num}
        </Button>
      ))}
      {/* 다음 페이지 */}
      <Next onClick={() => updatePage(nextPage)} disabled={page >= totalPages} />
      {/* 다음 블록 점프 */}
      <NextJump onClick={() => updatePage(nextJumpPage)} disabled={endNum >= totalPages} />
    </div>
  );
}
