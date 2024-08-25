import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

function useCheckin() {
  const queryClient = useQueryClient();
  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, checkInData }) =>
      updateBooking(bookingId, checkInData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "bookings" });
      toast.success("Successfully checked in");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkIn, isCheckingIn };
}

export default useCheckin;
