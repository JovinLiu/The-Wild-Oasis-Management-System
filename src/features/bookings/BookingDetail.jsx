import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import useCheckout from "../check-in-out/useCheckout";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const moveBack = useMoveBack();
  const { checkOut, isCheckingOut } = useCheckout();
  const isWorking = isDeleting || isCheckingOut;
  const { id: bookingId, status } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  //Handlers
  function handleClickCheckIn() {
    navigate(`/checkin/${bookingId}`);
  }

  function handleClickDelete() {
    deleteBooking(bookingId, {
      onSettled: () => {
        navigate("/bookings");
      },
    });
  }

  function handleClickCheckout() {
    checkOut(bookingId, {
      onSuccess: () => {
        navigate("/bookings");
      },
    });
  }

  //JSX
  if (isLoading) return <Spinner />;

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={handleClickCheckIn} disabled={isWorking}>
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={handleClickCheckout} disabled={isWorking}>
            Check out
          </Button>
        )}
        <Modal.Open openCode={bookingId}>
          <Button variation="danger" disabled={isWorking}>
            Delete Booking
          </Button>
        </Modal.Open>
        <Modal.Window verifyCode={bookingId}>
          <ConfirmDelete
            onConfirm={handleClickDelete}
            resourceName={`Booking ${bookingId}`}
            disabled={isWorking}
          />
        </Modal.Window>
        <Button variation="secondary" onClick={moveBack} disabled={isWorking}>
          Back
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;
