import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import ContestHeader from "../components/ContestHeader";
import GridPictures from "../components/GridPictures";

function ContestFeed() {
  const { hashtagName } = useParams();
  const contestArr = hashtagName.split(" ");
  return (
    <Fragment>
      <ContestHeader
        customYear={contestArr[0]}
        customMonth={contestArr[1]}
        customWeekNo={contestArr[2]}
      />
      <GridPictures noTitle="true" />
    </Fragment>
  );
}

export default ContestFeed;
