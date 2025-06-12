import React from 'react';

type propsPagination = {
  total: number;
  perPage: number;
  currentPage: number;
  visibleItems: string[];
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
};

export const Pagination: React.FC<propsPagination> = ({
  total,
  perPage,
  currentPage,
  visibleItems,
  onPageChange,
  onNext,
  onPrev,
}) => {
  const numberPages = Math.ceil(total / perPage);
  const arrayNumber = [];
  for (let i = 1; i <= numberPages; i += 1) {
    arrayNumber.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={onPrev}
          >
            «
          </a>
        </li>
        {arrayNumber.map(page => {
          return (
            <li
              key={page}
              className={`page-item ${page === currentPage ? 'active' : ''}`}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={`page-item ${currentPage === numberPages ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={onNext}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {visibleItems.map(item => {
          return (
            <li key={item} data-cy="item">
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};
