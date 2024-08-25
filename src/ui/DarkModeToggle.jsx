//Import
//Styles
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

//functions outside of Component
function DarkModeToggle() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  //Variables and Hooks
  //Handlers
  function handleClickDarkMode() {
    setIsDarkMode(!isDarkMode);
  }
  //JSX
  return (
    <ButtonIcon onClick={handleClickDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
