import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // Mutation create

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfuly created");
      queryClient.invalidateQueries({
        queryKey: "cabins",
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createCabin };
}
