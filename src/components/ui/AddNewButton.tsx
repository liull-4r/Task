import { useNavigate } from "react-router-dom";

export default function AddNewButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/add-new-bank")}
      className="bg-[#00008B] text-white px-6 py-2 rounded cursor-pointer"
    >
      + Add New
    </button>
  );
}
