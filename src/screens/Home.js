import React, { Fragment } from "react";
import styled from "styled-components";
import { isLoggedInVar } from "../Apollo";
import PageTitle from "../components/PageTitle";

const Feed = styled.div``;

export default function Home() {
  console.log(isLoggedInVar);
  return (
    <Fragment>
      <PageTitle title="home" />
      <div>
        <Feed>홈입니다~</Feed>
      </div>
    </Fragment>
  );
}
