import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}
const PaginationComponent = ({
  currentPage,
  handlePagination,
  totalPages,
}: PaginationComponentProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() =>
              handlePagination(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i} onClick={() => handlePagination(i + 1)}>
            <PaginationLink isActive={currentPage === i + 1}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              handlePagination(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
