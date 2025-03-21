import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../types/login.schema";
import { useLogin } from "../../hooks/useLogin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: (response) => {
        const token = response.data.data.token;
        sessionStorage.setItem("token", token); // ✅ Store token securely
        toast.success("Logged in successfully!");
        navigate("/dashboard"); // ✅ Redirect if needed
      },
      onError: () => {
        toast.error("Login failed. Please check your credentials.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              {...register("phoneNo")}
              type="text"
              placeholder="09XXXXXXXX"
              className="w-full border rounded p-3 focus:outline-none"
            />
            {errors.phoneNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNo.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded p-3 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-800 text-white py-3 rounded hover:bg-blue-900 transition duration-300 cursor-pointer"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
