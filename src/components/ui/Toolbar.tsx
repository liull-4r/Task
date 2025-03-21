import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import ViewToggle from "./ViewToggle";
import ExportButton from "./ExportButton";
import AddNewButton from "./AddNewButton";

export default function Toolbar() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded shadow">
      <div className="flex items-center gap-4">
        <SearchBar />
        <FilterDropdown />
      </div>

      <div className="flex items-center gap-4">
        <ViewToggle />
        <ExportButton />
        <AddNewButton />
      </div>
    </div>
  );
}
