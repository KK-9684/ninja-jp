"use client";

import React from "react";
import IconLeft from "@/assets/icon-pagination-left.svg";
import IconRight from "@/assets/icon-pagination-right.svg";
import Image from "next/image";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="arrow arrow-left"
      >
        <Image src={IconLeft} alt="" className="self-center mx-auto" />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`${"pageNumber"} ${
            currentPage === number ? "active" : ""
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="arrow arrow-right"
      >
        <Image src={IconRight} alt="" className="self-center mx-auto" />
      </button>
    </div>
  );
};

export default Pagination;
