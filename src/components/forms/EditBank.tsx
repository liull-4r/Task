import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBank } from "../../hooks/useUpdateBank";
import { updateBankSchema, UpdateBankFormData } from "../../types/bank.schema";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify"; // ✅ Add this import at the top

export default function EditBank() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const onCancel = () => {
    navigate(-1); // Go back to previous page
  };

  // ✅ Get pre-filled bank data from route state
  const bankData = location.state?.bankData;

  const { mutate: updateBank, isPending } = useUpdateBank();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBankFormData>({
    resolver: zodResolver(updateBankSchema),
    defaultValues: {
      name: bankData?.name || "",
      sortNo: bankData?.sort_no || 0,
    },
  });

  const onSubmit = (data: UpdateBankFormData) => {
    updateBank(
      { code: code || "", ...data },
      {
        onSuccess: () => {
          toast.success("Bank updated successfully!");
          navigate("/banks");
        },
        onError: () => toast.error("Update failed. Please try again."),
      }
    );
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={onCancel}
          className="text-black text-2xl font-bold mr-2 cursor-pointer"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-semibold">Edit Bank</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Name:</label>
          <input
            {...register("name")}
            className="border p-2 w-full"
            placeholder="Enter bank name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label>Sort No:</label>
          <input
            type="number"
            {...register("sortNo", { valueAsNumber: true })}
            className="border p-2 w-full"
          />
          {errors.sortNo && (
            <p className="text-red-500">{errors.sortNo.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="bg-gray-300 text-black px-6 py-2 rounded cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded cursor-pointer"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
