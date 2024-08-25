import { useState } from "react";
import styled from "styled-components";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import useSettings from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useEffect } from "react";
import useCheckin from "./useCheckin";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  //Variables and hooks
  const [OrderedBreakfastWhenArrive, setOrderedBreakfastWhenArrive] =
    useState(false);
  const [isPaidWhenArrive, setIsPaidWhenArrive] = useState(false);
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSetting } = useSettings();
  const { checkIn, isCheckingIn } = useCheckin();
  const { breakfastPrice } = settings;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
    cabinPrice,
    extrasPrice,
    status,
  } = booking;

  const totalBreakfastPrice = breakfastPrice * numGuests * numNights;
  const checkInData = {
    status: "checked-in",
    extrasPrice: hasBreakfast
      ? extrasPrice
      : OrderedBreakfastWhenArrive
      ? totalBreakfastPrice
      : 0,
    totalPrice: hasBreakfast
      ? totalPrice
      : OrderedBreakfastWhenArrive
      ? cabinPrice + totalBreakfastPrice
      : cabinPrice,
    hasBreakfast: OrderedBreakfastWhenArrive,
    isPaid: isPaidWhenArrive,
  };

  console.log(checkInData);

  //Effect
  useEffect(
    function () {
      if (hasBreakfast) setOrderedBreakfastWhenArrive(true);
      if (isPaid) setIsPaidWhenArrive(true);
    },
    [hasBreakfast, isPaid]
  );

  //Handlers
  function handleClickWantBreakfast() {
    setOrderedBreakfastWhenArrive(!OrderedBreakfastWhenArrive);
  }

  function handleClickIsPaidWhenArrive() {
    setIsPaidWhenArrive(!isPaidWhenArrive);
  }

  function handleCheckin() {
    checkIn(
      { bookingId, checkInData },
      {
        onSuccess: () => {
          navigate("/bookings");
        },
      }
    );
  }

  //JSX
  if (isLoading || isLoadingSetting) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {status === "unconfirmed" && !hasBreakfast && (
        <Box>
          <Checkbox
            checked={OrderedBreakfastWhenArrive}
            onChange={handleClickWantBreakfast}
            disabled={isCheckingIn}
          >
            Want to add breakfast for {formatCurrency(totalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      {status === "unconfirmed" && (
        <Box>
          <Checkbox
            checked={isPaidWhenArrive}
            onChange={handleClickIsPaidWhenArrive}
            disabled={isPaid || isCheckingIn}
          >
            I confirm that {guests.fullName} has paid the total amount of{" "}
            {formatCurrency(
              +cabinPrice +
                (hasBreakfast
                  ? extrasPrice
                  : OrderedBreakfastWhenArrive
                  ? totalBreakfastPrice
                  : 0)
            )}{" "}
            {hasBreakfast
              ? `(${formatCurrency(cabinPrice)}+${formatCurrency(extrasPrice)})`
              : OrderedBreakfastWhenArrive
              ? `(${formatCurrency(cabinPrice)}+${formatCurrency(
                  totalBreakfastPrice
                )})`
              : ""}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            onClick={handleCheckin}
            disabled={!isPaidWhenArrive || isCheckingIn}
          >
            Check in booking #{bookingId}
          </Button>
        )}
        <Button
          variation="secondary"
          onClick={moveBack}
          disabled={isCheckingIn}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
