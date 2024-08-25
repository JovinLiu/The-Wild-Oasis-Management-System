import styled from "styled-components";
import Stats from "../dashboard/Stats";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "../dashboard/DurationChart";
import SalesCharts from "../dashboard/SalesChart";
import useCabins from "../cabins/useCabins";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

//Import
//Styles
//functions outside of Component
function DashboardLayout() {
  //Variables and Hooks
  const { isLoading: isLoading1, error1, cabins } = useCabins();
  const {
    isLoading: isLoading2,
    error2,
    confrimedStays,
    lastNumOfDays,
  } = useRecentStays();
  const { isLoading: isLoading3, error3, recentBookings } = useRecentBookings();
  //Handlers
  if (error1 || error2 || error3)
    toast.error(error1.message || error2.message || error3.message);
  //JSX
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confrimedStays}
        numDays={lastNumOfDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confrimedStays} />
      <SalesCharts bookings={recentBookings} numDays={lastNumOfDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
