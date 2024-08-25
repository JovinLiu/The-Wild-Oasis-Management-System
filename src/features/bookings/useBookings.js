import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/config";

function useBookings(currentPage) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //filter
  const status = searchParams.get("status") || "all";

  //sort
  const [field, direction] = (
    searchParams.get("order") || "startDate-desc"
  ).split("-");
  const order = { field, direction };
  //query
  const {
    isLoading,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ["bookings", status, order, currentPage],
    queryFn: () => getBookings({ status, order, currentPage }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  // Pre-fetching
  if (currentPage < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, order, currentPage + 1],
      queryFn: () =>
        getBookings({ status, order, currentPage: currentPage + 1 }),
    });

  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, order, currentPage - 1],
      queryFn: () =>
        getBookings({ status, order, currentPage: currentPage - 1 }),
    });

  return { isLoading, error, bookings, count };
}

export default useBookings;
