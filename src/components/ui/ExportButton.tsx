import { CiExport } from "react-icons/ci";
import IconButton from "./IconButton";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { toast } from "react-toastify";

export default function ExportButton() {
  const selected = useSelector(
    (state: RootState) => state.selectedBanks.selected
  );

  const handleExport = () => {
    if (selected.length === 0) {
      toast.error("No data selected to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(selected);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Banks");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "banks.xlsx");
  };

  return (
    <IconButton
      icon={<CiExport />}
      label="Export"
      bordered
      onClick={handleExport}
    />
  );
}
