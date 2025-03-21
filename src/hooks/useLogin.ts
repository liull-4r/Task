import { useMutation } from "@tanstack/react-query";
import { client } from "../api/client";
import { LoginFormData } from "../types/login.schema";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => client.post("/signin", data), // ✅ API endpoint
  });
};
