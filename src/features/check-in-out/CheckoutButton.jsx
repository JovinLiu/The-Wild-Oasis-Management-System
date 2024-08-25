import Button from "../../ui/Button";
import SpinnerTiny from "../../ui/SpinnerTiny";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckout();

  function handleClickCheckOut() {
    checkOut(bookingId);
  }

  return (
    <Button variation="primary" size="small" onClick={handleClickCheckOut}>
      {isCheckingOut ? <SpinnerTiny /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
