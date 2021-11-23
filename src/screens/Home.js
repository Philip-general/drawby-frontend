import React, { Fragment } from "react";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";

const Feed = styled.div``;

const PictureContainer = styled.div``;

export default function Home() {
  return (
    <Fragment>
      <PageTitle title="home" />
      <div>
        <Feed></Feed>
      </div>
    </Fragment>
  );
}
