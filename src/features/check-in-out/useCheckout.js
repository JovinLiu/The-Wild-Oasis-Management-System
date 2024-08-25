import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "bookings" });
      toast.success("Successfully checked out");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkOut, isCheckingOut };
}

export default useCheckout;
