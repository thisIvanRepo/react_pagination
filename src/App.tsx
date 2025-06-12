import React, { ChangeEvent, useMemo, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage(prev => prev - 1);
  };

  const cangePerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
  };

  const startIndexSlice = useMemo(() => {
    const result = perPage * currentPage - perPage;

    if (result < 0) {
      return 0;
    }

    return result;
  }, [perPage, currentPage]);

  const endIndexSlice = startIndexSlice + perPage;

  const visibleItems = useMemo(() => {
    return items.slice(startIndexSlice, endIndexSlice);
  }, [perPage, currentPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page 1 (items {startIndexSlice} - {endIndexSlice} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={cangePerPage}
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
        onNext={nextPage}
        onPrev={prevPage}
      />
    </div>
  );
};

export default App;
