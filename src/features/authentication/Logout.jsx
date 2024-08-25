//Import
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
//Styles
//functions outside of Component
function Logout() {
  const { logout, isLoading } = useLogout();

  function handleClickLogout() {
    logout();
  }

  return (
    <ButtonIcon onClick={handleClickLogout}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
