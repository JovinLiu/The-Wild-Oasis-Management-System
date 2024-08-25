import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "../ui/HeaderMenu";
import DarkModeToggle from "../ui/DarkModeToggle";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.2rem 4.8rem;
  display: flex;
  gap: 3rem;
  justify-content: flex-end;
`;

function Header() {
  const navigate = useNavigate();

  function handleClickUser() {
    navigate("/account");
  }

  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu>
        <li>
          <ButtonIcon onClick={handleClickUser}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <Logout />
        </li>
      </HeaderMenu>
    </StyledHeader>
  );
}

export default Header;
