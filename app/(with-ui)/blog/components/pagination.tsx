"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    return `${basePath}?page=${page}`;
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-4">
      {/* 이전 페이지 */}
      {currentPage > 1 && (
        <Link href={getPageUrl(currentPage - 1)}>
          <Button variant="outline" size="sm">
            이전
          </Button>
        </Link>
      )}

      {/* 페이지 번호들 */}
      {getVisiblePages().map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="px-3 py-1 text-gray-500">...</span>
          ) : (
            <Link href={getPageUrl(page as number)}>
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="min-w-[40px]"
              >
                {page}
              </Button>
            </Link>
          )}
        </div>
      ))}

      {/* 다음 페이지 */}
      {currentPage < totalPages && (
        <Link href={getPageUrl(currentPage + 1)}>
          <Button variant="outline" size="sm">
            다음
          </Button>
        </Link>
      )}
    </div>
  );
}
