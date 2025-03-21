import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="flex items-center bg-gray-200 rounded px-4 py-2 w-[340px] ">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none flex-1 text-gray-700"
      />
      <span className="text-purple-800 font-bold">
        <FaSearch />
      </span>
    </div>
  );
}
