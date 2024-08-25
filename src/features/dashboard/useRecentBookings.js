import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const lastNumOfDays = searchParams.get("last") || 7;
  //计算任意天数之前的时间，转换成ISO string
  const queryDate = subDays(new Date(), lastNumOfDays).toISOString();

  const {
    isLoading,
    error,
    data: recentBookings,
  } = useQuery({
    queryKey: ["bookings", `last-${lastNumOfDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isLoading, error, recentBookings };
}

export default useRecentBookings;
