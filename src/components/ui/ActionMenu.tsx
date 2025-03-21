interface ActionItem {
  label: string;
  icon: React.ReactNode;
  color?: string;
  onClick: () => void;
}

interface ActionMenuProps {
  items: ActionItem[];
}

export default function ActionMenu({ items }: ActionMenuProps) {
  return (
    <div className="absolute bg-white border rounded shadow right-2 bottom-12 z-10 w-40 cursor-pointer">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={`flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 cursor-pointer ${
            item.color || "text-gray-700"
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}
