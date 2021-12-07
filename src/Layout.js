import React, { Fragment } from "react";
import Header from "./Header";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Main = styled.main`
  background-color: ${props => (props.color ? props.color : "#fff")};
  display: flex;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
`;

const Feed = styled.div``;

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <Line />
      <Main color={children[0]}>
        <Sidebar />
        <Feed>{children[1]}</Feed>
      </Main>
    </Fragment>
  );
}
