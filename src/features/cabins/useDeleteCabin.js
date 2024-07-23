import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Cabin has been deleted.",
        icon: "success",
        timer: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: "cabins",
      });
    },
    onError: (err) => {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        timer: 6000,
      });
    },
  });

  return {
    isDeleting,
    deleteCabin,
  };
}
