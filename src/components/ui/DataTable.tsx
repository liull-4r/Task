import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ActionMenu from "./ActionMenu";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

import { useDeleteBank } from "../../hooks/useDeleteBank";

import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setSelected } from "../../redux/selectedBankSlice";
import Pagination from "./Pagination";

export default function DataTable({ data }: { data: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const [menuRow, setMenuRow] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const selectedRows = useSelector(
    (state: RootState) => state.selectedBanks.selected
  );

  const { mutate: deleteBank } = useDeleteBank();

  const handleEdit = (row: any) => {
    console.log("edit row is", row);
    navigate(`/edit-bank/${row.code}`, { state: { bankData: row } });
  };

  const handleDelete = (code: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBank(code, {
          onSuccess: () => {
            Swal.fire("Deleted!", "The bank has been deleted.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Failed to delete the bank.", "error");
          },
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto  shadow bg-white mt-6 p-8 rounded-lg">
      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-white text-gray-700 font-semibold">
          <tr>
            <th className="p-3 border">
              {/* <input type="checkbox" /> */}

              <input
                type="checkbox"
                checked={selectedRows.length === data.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(setSelected(data));
                  } else {
                    dispatch(setSelected([])); // Deselect all
                  }
                }}
              />
            </th>
            <th className="p-3 border bg-white">Code</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Sort Number</th>
            <th className="p-3 border">Created By</th>
            <th className="p-3 border">Created At</th>
            <th className="p-3 border">Updated By</th>
            <th className="p-3 border">Updated At</th>
            <th className="p-3 border"></th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((row) => (
              <tr key={row.code} className="border  relative cursor-pointer">
                <td className="p-3 border">
                  {/* <input type="checkbox" /> */}
                  <input
                    type="checkbox"
                    checked={selectedRows.some(
                      (selectedRow) => selectedRow.code === row.code
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(setSelected([...selectedRows, row]));
                      } else {
                        dispatch(
                          setSelected(
                            selectedRows.filter(
                              (selectedRow) => selectedRow.code !== row.code
                            )
                          )
                        );
                      }
                    }}
                  />
                </td>
                <td className="p-3 border">{row.code}</td>
                <td className="p-3 border">{row.name}</td>
                <td className="p-3 border">{row.sort_no}</td>
                <td className="p-3 border">{row.created_by}</td>
                <td className="p-3 border">
                  {/* {row.CreatedAt.slice(0, 10)} */}

                  {row.created_at ? row.created_at.slice(0, 10) : "N/A"}
                </td>
                <td className="p-3 border">{row.updated_by}</td>
                <td className="p-3 border">
                  {/* {row.UpdatedAt.slice(0, 10)} */}
                  {row.updated_at ? row.updated_at.slice(0, 10) : "N/A"}
                </td>
                <td className="p-3 border text-right relative">
                  <button
                    onClick={() =>
                      setMenuRow(menuRow === row.code ? null : row.code)
                    }
                    className="cursor-pointer"
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {menuRow === row.code && (
                    <ActionMenu
                      items={[
                        {
                          label: "Update",
                          icon: <BiEdit />,
                          color: "text-gray-700",
                          onClick: () => handleEdit(row),
                        },
                        {
                          label: "Delete",
                          icon: <RiDeleteBin6Line />,
                          color: "text-red-600",
                          onClick: () => handleDelete(row.code),
                        },
                      ]}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalRows={data.length}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  );
}
