"use client";
import { generatePagination } from "@/lib/util/generatePagination";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import IconLeft from "@/assets/icon-pagination-left.svg";
import IconRight from "@/assets/icon-pagination-right.svg";
import Image from "next/image";
import clsx from "clsx";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="pagination">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
        <div className="flex -space-x-px text-ninjack-white">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>
        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

interface PaginationNumberProps {
  page: PaginationItem;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: PaginationNumberProps) {
  return isActive || position === "middle" ? (
    <div className={clsx("pageNumber", isActive && "active")}>{page}</div>
  ) : (
    <Link className="pageNumber" href={href}>
      {page}
    </Link>
  );
}
function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  if (isDisabled) {
    return (
      <div className={`arrow arrow-${direction}`}>
        <Image
          src={direction === "left" ? IconLeft : IconRight}
          alt={direction === "left" ? "前へ" : "次へ"}
          className="self-center mx-auto"
        />
      </div>
    );
  }

  return (
    <Link href={href} className={`arrow arrow-${direction}`}>
      <Image
        src={direction === "left" ? IconLeft : IconRight}
        alt={direction === "left" ? "前へ" : "次へ"}
        className="self-center mx-auto"
      />
    </Link>
  );
}
