import React, { useState, useEffect, ComponentType } from "react";
import PaginationComponent from "./dashboard/Pagination";

// Types for the HOC
interface PaginationConfig {
  itemsPerPage?: number;
  initialPage?: number;
}

interface InjectedPaginationProps<T> {
  currentPageItems: T[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  allItems: T[];
}

interface WithPaginationProps<T> {
  items: T[];
  searchTerm?: string;
  filterFn?: (item: T, searchTerm: string) => boolean;
  filterBy?: string[]; // ✅ Array of filter criteria like ["newest", "closed"]
  filterByFn?: (item: T, filters: string[]) => boolean; // ✅ Function to apply filters
}

// HOC function
function withPagination<T, P extends object>(
  WrappedComponent: ComponentType<P & InjectedPaginationProps<T>>,
  config: PaginationConfig = {}
) {
  const { itemsPerPage = 5, initialPage = 1 } = config;

  return function PaginatedComponent(props: P & WithPaginationProps<T>) {
    const {
      items,
      searchTerm = "",
      filterFn,
      filterBy = [], // ✅ Default empty array
      filterByFn, // ✅ Custom filter function
      ...restProps
    } = props;

    const [currentPage, setCurrentPage] = useState(initialPage);

    // Step 1: Apply search filter
    const searchFilteredItems =
      filterFn && searchTerm
        ? items.filter((item) => filterFn(item, searchTerm))
        : items;

    // Step 2: Apply status/category filters
    const fullyFilteredItems =
      filterByFn && filterBy.length > 0
        ? searchFilteredItems.filter((item) => filterByFn(item, filterBy))
        : searchFilteredItems;

    // Calculate pagination
    const totalPages = Math.ceil(fullyFilteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const currentPageItems = fullyFilteredItems.slice(startIndex, endIndex);

    // Reset to page 1 when search or filters change
    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, items.length, filterBy.join(",")]); // ✅ Also reset on filter change

    const handlePagination = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <WrappedComponent
            {...(restProps as P)}
            currentPageItems={currentPageItems}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            allItems={fullyFilteredItems}
          />
        </div>

        {totalPages > 1 && (
          <div className="mt-4">
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              handlePagination={handlePagination}
            />
          </div>
        )}
      </div>
    );
  };
}

export default withPagination;
