import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBookingDetail() {
  const { bookingId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookingDetail", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { data, isLoading, error };
}
