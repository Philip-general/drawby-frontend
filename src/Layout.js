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
  z-index: 1000;
  position: fixed;
  top: 60px;
  background-color: #eee;
`;

const Feed = styled.div`
  position: relative;
  top: 61px;
  left: 400px;
`;

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
