"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationNextJump,
  PaginationPrevious,
  PaginationPreviousJump,
} from "@/components/ui/client-pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  page: number;
  totalPages: number;
  numbersPerPage?: number;
}

export function ClientPagination({ page: initialPage, totalPages, numbersPerPage = 10 }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const startPage = Math.floor((currentPage - 1) / numbersPerPage) * numbersPerPage + 1;
  const endPage = Math.min(startPage + numbersPerPage - 1, totalPages);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString()); // 기존 쿼리스트링 유지
    params.set("page", String(currentPage)); // page 값만 변경
    router.push(`?${params.toString()}`); // 변경된 쿼리스트링 적용
  }, [currentPage]);

  const prevJump = () => setCurrentPage(Math.max(startPage - numbersPerPage, 1));
  const prev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const next = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const nextJump = () => setCurrentPage(Math.min(endPage + 1, totalPages));

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  if (pages.length === 0) return null;

  return (
    <Pagination className="my-10">
      <PaginationContent className="flex-wrap /justify-center sm:flex-nowrap">
        <PaginationItem>
          <PaginationPreviousJump onClick={prevJump} disabled={startPage <= 1} />
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious onClick={prev} disabled={currentPage <= 1} />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationButton isActive={page === currentPage} onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationButton>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext onClick={next} disabled={currentPage >= totalPages} />
        </PaginationItem>

        <PaginationItem>
          <PaginationNextJump onClick={nextJump} disabled={endPage >= totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
