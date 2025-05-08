import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationNextJump,
  PaginationPrevious,
  PaginationPreviousJump,
} from "@/components/ui/server-pagination";

interface Props {
  page: number;
  totalPages: number;
  numbersPerPage?: number;
}

export function ServerPagination({ page, totalPages, numbersPerPage = 10 }: Props) {
  const startPage = Math.floor((page - 1) / numbersPerPage) * numbersPerPage + 1;
  const endPage = Math.min(startPage + numbersPerPage - 1, totalPages);

  return (
    <Pagination>
      <PaginationContent className="flex-wrap /justify-center sm:flex-nowrap">
        <PaginationItem>
          <PaginationPreviousJump
            href={`?page=${Math.max(startPage - numbersPerPage, 1)}`}
            className={startPage <= 1 ? "opacity-30 pointer-events-none" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href={`?page=${page - 1}`}
            className={page <= 1 ? "opacity-30 pointer-events-none" : ""}
          />
        </PaginationItem>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNumber = startPage + i;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink href={`?page=${pageNumber}`} isActive={pageNumber === page}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={`?page=${page + 1}`}
            className={page >= totalPages ? "opacity-30 pointer-events-none" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNextJump
            href={`?page=${Math.min(endPage + 1, totalPages)}`}
            className={endPage >= totalPages ? "opacity-30 pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
