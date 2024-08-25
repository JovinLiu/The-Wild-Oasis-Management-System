//Import
import styled from "styled-components";
//Styles
const HeadrMenuContainer = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
//functions outside of Component
function HeaderMenu({ children }) {
  //Variables and Hooks
  //Handlers
  //JSX
  return <HeadrMenuContainer>{children}</HeadrMenuContainer>;
}

export default HeaderMenu;
