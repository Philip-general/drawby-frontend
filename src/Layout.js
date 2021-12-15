import React, { Fragment } from "react";
import Header from "./Header";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Main = styled.main`
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
  background-color: ${props => (props.color ? props.color : "#fff")};
  position: relative;
  padding: 61px 400px;
  min-height: 100vh;
`;

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <Line />
      <Sidebar />
      <Main>
        <Feed color={children[0]}>{children[1]}</Feed>
      </Main>
    </Fragment>
  );
}
