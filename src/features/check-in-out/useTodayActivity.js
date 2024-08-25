import { getStaysTodayActivity } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, activities };
}

export default useTodayActivity;
