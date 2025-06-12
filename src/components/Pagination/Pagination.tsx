import React from 'react';

type PropsPagination = {
  total: number;
  perPage: number;
  currentPage: number;
  visibleItems: string[];
  onPageChange: (page: number) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<PropsPagination> = ({
  total,
  perPage,
  currentPage,
  visibleItems,
  onPageChange,
  setPage,
}) => {
  const numberPages = Math.ceil(total / perPage);
  const arrayNumber = [];

  for (let i = 1; i <= numberPages; i += 1) {
    arrayNumber.push(i);
  }

  const nextPage = () => {
    if (currentPage === numberPages) {
      return;
    }

    setPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }

    setPage(prev => prev - 1);
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={prevPage}
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
            aria-disabled={currentPage === numberPages}
            onClick={nextPage}
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
