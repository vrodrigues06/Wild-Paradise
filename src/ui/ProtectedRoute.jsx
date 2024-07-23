import React from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // 1. Load the authenticated user

  const { isLoading, isAuthenticated } = useUser();

  // 2. While loading, show a spinner

  if (isLoading)
    return (
      <FullPage>
        {" "}
        <Spinner />
      </FullPage>
    );

  // 3. if there is no authenticated user, redirect to /login

  if (!isAuthenticated) navigate("/login");

  // 4. if there is a user authenticated, render the app

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
