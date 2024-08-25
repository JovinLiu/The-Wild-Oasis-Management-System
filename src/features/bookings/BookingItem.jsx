import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiEllipsisVertical,
  HiEye,
  HiMiniArrowDownOnSquare,
  HiMiniArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useDeleteBooking from "./useDeleteBooking";
import useCheckout from "../check-in-out/useCheckout";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingItem({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkOut, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  const isWorking = isDeleting || isCheckingOut;

  function handleClickDetails() {
    navigate(`/bookings/${bookingId}`);
  }

  function handleClickCheckIn() {
    navigate(`/checkin/${bookingId}`);
  }

  function handleClickCheckOut(bookingId) {
    checkOut(bookingId);
  }

  function handleClickDelete(bookingId) {
    deleteBooking(bookingId);
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus.Menu>
        <Menus.Open openCode={bookingId}>
          <HiEllipsisVertical />
        </Menus.Open>
        <Menus.Window verifyCode={bookingId}>
          <li>
            <Menus.Button
              icon={<HiEye />}
              onClick={handleClickDetails}
              disabled={isWorking}
            >
              See Details
            </Menus.Button>
          </li>
          {status === "unconfirmed" && (
            <li>
              <Menus.Button
                icon={<HiMiniArrowDownOnSquare />}
                onClick={handleClickCheckIn}
                disabled={isWorking}
              >
                Check In
              </Menus.Button>
            </li>
          )}
          {status === "checked-in" && (
            <li>
              <Menus.Button
                icon={<HiMiniArrowUpOnSquare />}
                onClick={() => handleClickCheckOut(bookingId)}
                disabled={isWorking}
              >
                Check Out
              </Menus.Button>
            </li>
          )}
          <li>
            <Menus.Button
              icon={<HiTrash />}
              onClick={() => handleClickDelete(bookingId)}
              disabled={isWorking}
            >
              Delete Booking
            </Menus.Button>
          </li>
        </Menus.Window>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingItem;
