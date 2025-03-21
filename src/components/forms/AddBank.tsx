import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankSchema, BankFormData } from "../../types/bank.schema";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { useAddBank } from "../../hooks/useAddBank";
import { toast } from "react-toastify";

export default function BankForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      name: "",
      code: "",
      sortNo: 0,
    },
  });
  const { mutate: addBank, isPending } = useAddBank();

  const onSubmit = (data: BankFormData) => {
    addBank(data, {
      onSuccess: () => {
        toast.success("Bank added successfully!");
        navigate("/banks");
      },
      onError: () => {
        toast.error("Failed to add bank. Please try again.");
      },
    });
  };

  // ✅ Cancel Handler
  const onCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto bg-[#fff] p-6 rounded shadow"
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={onCancel}
          className="text-black text-2xl font-bold mr-2 cursor-pointer"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-semibold">Add New</h2>
      </div>

      {/* Form Container */}
      <div className="space-y-4 border p-6 rounded bg-[#fff]">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register("name")}
            type="text"
            className="w-full border rounded p-3"
            placeholder="Enter bank name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Code */}
        <div>
          <label className="block text-sm font-medium mb-1">Code</label>
          <input
            {...register("code")}
            type="text"
            className="w-full border rounded p-3"
            placeholder="Enter bank code"
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        {/* Sort No */}
        <div>
          <label className="block text-sm font-medium mb-1">Sort No</label>
          <input
            {...register("sortNo", { valueAsNumber: true })}
            type="number"
            className="w-full border rounded p-3"
          />
          {errors.sortNo && (
            <p className="text-red-500 text-sm mt-1">{errors.sortNo.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#00008B] text-white px-8 py-3 rounded font-semibold cursor-pointer"
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}
