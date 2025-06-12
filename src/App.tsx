import React, { ChangeEvent, useMemo, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = useMemo(() => {
    const index = perPage * currentPage - perPage;

    if (index < 0) {
      return 0;
    }

    return index;
  }, [perPage, currentPage]);

  const endIndex = useMemo(() => {
    const index = startIndex + perPage;

    if (index >= items.length) {
      return items.length;
    }

    return index;
  }, [startIndex, perPage]);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [startIndex, endIndex]);

  const changePerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    setCurrentPage(1);
    setPerPage(+event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {endIndex} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={changePerPage}
            defaultValue={perPage}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        visibleItems={visibleItems}
        onPageChange={(number: number) => {
          setCurrentPage(number);
        }}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
