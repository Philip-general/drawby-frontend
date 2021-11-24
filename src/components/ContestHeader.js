import React from "react";
import styled from "styled-components";

const ContestHeaderContainer = styled.div``;

const RankedPictures = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
`;

const ContestName = styled.div``;

const RankedPicture = styled.div`
  width: 150px;
  height: 150px;
  background-color: skyblue;
  margin-right: 10px;
`;

function ContestHeader() {
  const rankedPictures = ["1", "2", "3", "4", "5"];
  // 오버플로우 되는 부분들 만져줘야함. (hidden)
  // 스크롤 혹은 버튼으로 스크롤이 가능하게끔 변경 필요
  return (
    <ContestHeaderContainer>
      <ContestName>#12월 첫째주</ContestName>
      <RankedPictures>
        {rankedPictures.map(picture => (
          <RankedPicture>{picture}</RankedPicture>
        ))}
      </RankedPictures>
    </ContestHeaderContainer>
  );
}

export default ContestHeader;
