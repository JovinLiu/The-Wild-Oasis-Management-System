import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { booking, error, isLoading };
}

export default useBooking;
