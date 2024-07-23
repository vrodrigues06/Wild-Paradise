import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: loginFn } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) =>
      toast.error("Authentication failed. Please verify your credentials."),
  });

  return { isLoading, loginFn };
};
