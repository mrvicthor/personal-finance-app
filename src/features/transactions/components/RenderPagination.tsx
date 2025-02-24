"use client";
import React from "react";
import Image from "next/image";
import leftArrow from "../../../../public/assets/images/icon-caret-left.svg";
import rightArrow from "../../../../public/assets/images/icon-caret-right.svg";

type PaginationProps = {
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  currentPage: number;
};

const RenderPagination = ({
  totalPages,
  handlePageChange,
  currentPage,
}: PaginationProps) => {
  const renderPaginationButtons = () => {
    return (
      <>
        {[1, 2].map((page) => (
          <button
            className={`${
              page === currentPage
                ? "bg-[#201F24] text-white"
                : "text-[#201F24]"
            } h-[2.5rem] w-[2.5rem] rounded-lg hover:bg-[#98908B] hover:text-white border border-[#98908B] cursor-pointer`}
            key={page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <span className="flex items-center justify-center h-[2.5rem] w-[2.5rem] font-semibold rounded-lg border border-[#98908B]">
          ...
        </span>
        <button
          className={`${
            totalPages === currentPage
              ? "bg-[#201F24] text-white"
              : "text-[#201F24]"
          } h-[2.5rem] w-[2.5rem] rounded-lg hover:bg-[#98908B] hover:text-white border border-[#98908B] cursor-pointer`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      </>
    );
  };
  return (
    <>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex w-[3rem] sm:w-[5.875rem] h-[2.5rem] items-center gap-6 px-4 border border-[#98908B] hover:bg-[#98908B] hover:text-white rounded-lg cursor-pointer"
          >
            <Image src={leftArrow} alt="previous arrow icon" className="" />
            <span className="hidden sm:block capitalize">prev</span>
          </button>
          <div className="flex items-center gap-1 sm:hidden ">
            {renderPaginationButtons()}
          </div>
          <div className="hidden sm:flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                className={`${
                  page === currentPage
                    ? "bg-[#201F24] text-white"
                    : "text-[#201F24]"
                } h-[2.5rem] w-[2.5rem] rounded-lg hover:bg-[#98908B] hover:text-white border border-[#98908B] cursor-pointer`}
                key={page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex w-[3rem] sm:w-[5.875rem] h-[2.5rem] items-center gap-6 px-4 border border-[#98908B] hover:bg-[#98908B] hover:text-white rounded-lg cursor-pointer"
          >
            <Image src={rightArrow} alt="next arrow icon" />
            <span className="hidden sm:block capitalize">next</span>
          </button>
        </div>
      )}
    </>
  );
};

export default RenderPagination;
