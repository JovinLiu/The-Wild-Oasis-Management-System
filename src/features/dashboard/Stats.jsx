//Import
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "../../features/dashboard/Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //Variables and Hooks

  const bookingCount = bookings.length;
  const sales = formatCurrency(
    bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
  );
  const checkinCount = confirmedStays.length;
  const occupancyRate =
    Math.round(
      (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinCount)) *
        100
    ) + "%";

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={bookingCount}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={sales}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkinCount}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={occupancyRate}
        color="yellow"
      />
    </>
  );
}

export default Stats;
