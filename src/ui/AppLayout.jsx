import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;

  @media (max-width: 1000px) {
    padding: 2rem 2.4rem;
  }
  @media (max-width: 500px) {
    padding: 2rem 1rem;
  }
`;

const StyledAppLayout = styled.section`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 1000px) {
    grid-template-columns: 6rem 1fr;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 800px) {
    gap: 2rem;
  }
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
