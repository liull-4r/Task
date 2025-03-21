import { useState } from "react";
import { FaEllipsisV, FaStamp, FaTimesCircle } from "react-icons/fa";
import { useApproveBank } from "../../hooks/useApproveBank";
import { useRejectBank } from "../../hooks/useRejectBank";
import Swal from "sweetalert2";

import ActionMenu from "./ActionMenu";
import Pagination from "./Pagination";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setSelected } from "../../redux/selectedBankSlice";

export default function PendingDataTable({ data }: { data: any[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedRows = useSelector(
    (state: RootState) => state.selectedBanks.selected
  );

  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { mutate: approveBank } = useApproveBank();
  const { mutate: rejectBank } = useRejectBank();

  const handleApprove = (workflowId: string) => {
    console.log("workflowCode", workflowId);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        approveBank(workflowId, {
          onSuccess: () => {
            setActionMenuOpen(null);
            Swal.fire("Approved!", "The item has been approved.", "success");
          },
          onError: () => {
            setActionMenuOpen(null);
            Swal.fire("Error!", "Failed to approve.", "error");
          },
        });
      }
    });
  };

  const handleReject = (workflowId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectBank(workflowId, {
          onSuccess: () => {
            setActionMenuOpen(null);
            Swal.fire("Rejected!", "The item has been rejected.", "success");
          },
          onError: () => {
            setActionMenuOpen(null);
            Swal.fire("Error!", "Failed to reject.", "error");
          },
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto  shadow bg-white mt-6 p-8 rounded-lg">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">
              {/* <input type="checkbox" /> */}
              <input
                type="checkbox"
                checked={selectedRows.length === data.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(
                      setSelected(data.map((item) => item.workflow.data))
                    );
                  } else {
                    dispatch(setSelected([])); // Deselect all
                  }
                }}
              />
            </th>
            <th className="p-3 border">Action Type</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Code</th>
            <th className="p-3 border">Sort Number</th>
            <th className="p-3 border">Created At</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((item) => (
              <tr key={item.workflow.id} className="hover:bg-gray-50">
                <td className="p-3 border">
                  {/* <input type="checkbox" /> */}
                  <input
                    type="checkbox"
                    checked={selectedRows.some(
                      (selectedRow) =>
                        selectedRow.Code === item.workflow.data.Code
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(
                          setSelected([...selectedRows, item.workflow.data])
                        );
                      } else {
                        dispatch(
                          setSelected(
                            selectedRows.filter(
                              (selectedRow) =>
                                selectedRow.Code !== item.workflow.data.Code
                            )
                          )
                        );
                      }
                    }}
                  />
                </td>
                <td className="p-3 border">{item.workflow.actionType}</td>
                <td className="p-3 border">{item.workflow.data.Name || item.workflow.data.name}</td>
                <td className="p-3 border">{item.workflow.data.Code|| item.workflow.data.code}</td>
                <td className="p-3 border">{item.workflow.data.SortNo || item.workflow.data.sort_no}</td>
                <td className="p-3 border">
                  {new Date(item.workflow.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 border relative ">
                  <button
                    onClick={() =>
                      setActionMenuOpen(
                        actionMenuOpen === item.workflow ? null : item.workflow
                      )
                    }
                    className="cursor-pointer"
                  >
                    <FaEllipsisV />
                  </button>

                  {/* Action Menu */}
                  {actionMenuOpen === item.workflow && (
                    <ActionMenu
                      items={[
                        {
                          label: "Approve",
                          icon: <FaStamp />,
                          color: "text-blue-600",
                          onClick: () => handleApprove(item.workflow.id),
                        },
                        {
                          label: "Reject",
                          icon: <FaTimesCircle />,
                          color: "text-red-600",
                          onClick: () => handleReject(item.workflow.id),
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
