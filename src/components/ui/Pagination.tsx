import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination({
  currentPage,
  totalRows,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
}: {
  currentPage: number;
  totalRows: number;
  rowsPerPage: number;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div>
      <div className="flex items-center gap-2 justify-center mt-5">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className="border border-gray-300 rounded p-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
        >
          <MdKeyboardArrowLeft />
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          className="border border-gray-300 rounded p-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>

      <div className="flex items-center justify-between mt-4 px-4">
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * rowsPerPage + 1}-
          {Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows}
        </div>

        <div className="flex items-center text-sm text-gray-700">
          Results per page:
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to page 1 when rows change
            }}
            className="ml-2 border border-gray-300 rounded p-1 cursor-pointer"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
