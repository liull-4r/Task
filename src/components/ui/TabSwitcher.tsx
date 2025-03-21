type Tab = "BANK" | "PENDING";

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function TabSwitcher({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex bg-white rounded-lg p-2 mt-2">
      {/* BANK Tab */}
      <button
        className={`py-3 px-5 rounded-lg text-sm font-semibold cursor-pointer ${
          activeTab === "BANK"
            ? "bg-[#00008B] text-white shadow"
            : "text-gray-800"
        }`}
        onClick={() => onTabChange("BANK")}
      >
        BANK
      </button>

      <div className="w-px h-8 bg-gray-300 mx-4 mt-2"></div>

      {/* PENDING Tab */}
      <button
        className={`py-3 px-5 rounded-lg text-sm font-semibold cursor-pointer ${
          activeTab === "PENDING"
            ? "bg-[#00008B] text-white shadow"
            : "text-gray-800"
        }`}
        onClick={() => onTabChange("PENDING")}
      >
        PENDING
      </button>
    </div>
  );
}
