import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import ContestHeader from "../components/ContestHeader";
import { DivisionLine } from "../components/DivisionLine";
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
      <DivisionLine />
      <GridPictures noTitle="true" contest="true" />
    </Fragment>
  );
}

export default ContestFeed;
