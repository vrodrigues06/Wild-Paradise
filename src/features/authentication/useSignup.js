import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignup = () => {
  const {
    mutate: signUpFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
  });

  return { signUpFn, isLoading, error };
};
