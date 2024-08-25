import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const lastNumOfDays = searchParams.get("last") || 7;
  //计算任意天数之前的时间，转换成ISO string
  const queryDate = subDays(new Date(), lastNumOfDays).toISOString();

  const {
    isLoading,
    error,
    data: stays,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${lastNumOfDays}`],
  });

  const confrimedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, error, confrimedStays, lastNumOfDays };
}

export default useRecentStays;
