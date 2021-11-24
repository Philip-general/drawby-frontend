import React, { Fragment } from "react";
import Header from "./Header";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Main = styled.main`
  display: flex;
`;

const Feed = styled.div``;

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <Main>
        <Sidebar />
        <Feed>{children}</Feed>
      </Main>
    </Fragment>
  );
}
