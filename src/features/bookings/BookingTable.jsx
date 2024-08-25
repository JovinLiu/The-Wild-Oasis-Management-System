import BookingItem from "./BookingItem";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import useBookings from "./useBookings";
import toast from "react-hot-toast";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const [searchParams] = useSearchParams();

  let currentPage = Math.round(searchParams.get("page") || 1);

  const { isLoading, error, bookings, count } = useBookings(currentPage);

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="Booking" />;

  if (error) toast.error(error.message);

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingItem key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} currentPage={currentPage} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
