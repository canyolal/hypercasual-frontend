import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationElement = ({pagesCount,currentPage,setPageNum,alwaysShown = true}) => {
  const isPaginationShown = alwaysShown ? true : pagesCount > 1;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const changePage = number => {
    if (currentPage === number) return;
    setPageNum(number);
  };

  const onPageNumberClick = pageNumber => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(currentPage => currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage(currentPage => currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setPageNum(pagesCount);
    }
  };

  let isPageNumberOutOfRange;

  console.log("pagesCount: ",pagesCount)
  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <>
      {isPaginationShown && (
        <Pagination>
          <Pagination.Prev
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
          />
        </Pagination>
      )}
    </>
  );
};


export default PaginationElement;