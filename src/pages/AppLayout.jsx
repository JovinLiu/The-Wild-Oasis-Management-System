import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import SideBar from "../ui/SideBar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: var(--color-grey-0);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-grey-500);
    border-radius: 10px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-width: 120rem;
  margin: 0 auto;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SideBar />
      <Header />
      <Main>
        <StyledContainer>
          <Outlet />
        </StyledContainer>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
