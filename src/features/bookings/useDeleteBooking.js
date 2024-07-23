import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import Swal from "sweetalert2";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteBookingMutate,
    isLoading: isDeleting,
    error,
    onSuccess,
  } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Booking has been deleted.",
        icon: "success",
        timer: 2000,
      });
      queryClient.invalidateQueries({ active: true });
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

  return { deleteBookingMutate, isDeleting, error, onSuccess };
};
