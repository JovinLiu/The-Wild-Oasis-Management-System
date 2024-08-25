//Import
import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Styles
const FullScreen = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

//functions outside of Component
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //Variables and Hooks
  //Handlers
  //JSX
  // 1. Load the authenticated user
  //NOTE:5.authorization环节中，ProtectedRoute再次向服务器请求当前的用户信息
  const { isLoading, isAuthenticated } = useUser();
  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      //NOTE:12.在验证没通过并且没有才读取用户数据的时候，就导航回login page
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullScreen>
        <Spinner />
      </FullScreen>
    );
  // 4. If there IS a user, render the app
  //NOTE:13.最后验证一下，放行
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
