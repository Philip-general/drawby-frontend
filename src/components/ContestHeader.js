import React, { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import useDate from "../hooks/useDate";
import { FontSpan } from "./Common/Commons";
import { SmallPicture } from "./Common/GridPictures";

const ContestHeaderContainer = styled.div``;

const RankedPictures = styled.div`
  max-width: 680px;
  height: 200px;
  display: flex;
`;
const HiddenContainer = styled.div`
  max-width: 680px;
  overflow: hidden;
`;
const ContestName = styled(FontSpan)`
  margin: 30px 0 16px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.44;
  color: #333;
`;

const PictureContainer = styled.div`
  display: flex;
  align-content: center;
  width: 680px;
`;

const RankedPictureContainer = styled.div`
  position: relative;
  min-width: 137px;
  max-width: 137px;
  min-height: 137px;
  max-height: 137px;
  border-radius: 8px;
  margin-right: 10px;
  overflow-wrap: break-word;
`;

const SmallPictureShade = styled.div`
  background-size: cover;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.4)
  );
  width: 137px;
  height: 137px;
  border-radius: 8px;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
`;

const SeeMoreBox = styled.div`
  background-color: black;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 137px;
  height: 137px;
  border-radius: 8px;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.4;
`;

const RankedPictureName = styled(FontSpan)`
  font-size: 14px;
  font-weight: 500;
  color: #444;
`;

const RankedPictureHashtags = styled.div`
  display: flex;
`;

const RankedPictureHashtag = styled(FontSpan)`
  font-size: 12px;
  font-weight: light;
  color: #3690f8;
  margin-right: 5px;
`;

const SlideBtn = styled.img`
  width: 66px;
  height: 66px;
  position: absolute;
  top: ${props => (props.y ? props.y : "108px")};
  z-index: 1;
  left: ${props => props.x};
`;

const RobotoFont = styled.span`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 10000;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-style: italic;
  line-height: 0.9;
  color: #fff;
  font-weight: bold;
`;

const SEE_CONTEST_RANK_QUERY = gql`
  query seeContestRank($hashtagName: String!) {
    seeContestRank(hashtagName: $hashtagName) {
      id
      name
      totalLike
      file
      rank
      hashtags {
        id
        hashtagName
      }
    }
  }
`;

function ContestHeader({ customYear, customMonth, customWeekNo }) {
  const { year, month, weekNo } = useDate(new Date());
  const contestDate =
    customYear !== undefined
      ? `#${customYear}_${customMonth}_${customWeekNo}`
      : `#${year}년_${month}월_${weekNo}주차`;
  const contestHeaderName =
    customYear !== undefined
      ? `#${customYear} ${customMonth} ${customWeekNo}`
      : `#${year}년 ${month}월 ${weekNo}주차`;
  // const contestDate = "#Bicycle";
  const { data: rankedData } = useQuery(SEE_CONTEST_RANK_QUERY, {
    variables: { hashtagName: contestDate }
  });
  const picturesLen = rankedData?.seeContestRank.length;

  const TOTAL_SLIDE = picturesLen > 4 ? picturesLen - 4 : 0;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDE) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDE);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    const space = currentSlide * 147;
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${space}px)`;
  }, [currentSlide]);

  // test contest array
  const rankedPictures = rankedData?.seeContestRank;
  return (
    <ContestHeaderContainer>
      <ContestName>{contestHeaderName}</ContestName>
      <PictureContainer>
        {picturesLen > 4 && (
          <SlideBtn
            onClick={prevSlide}
            x="-35px"
            src="/PictureSrc/LeftArrow.png"
          />
        )}
        <HiddenContainer>
          <RankedPictures ref={slideRef}>
            {rankedPictures &&
              rankedPictures.map(picture => (
                <RankedPictureContainer key={picture.id}>
                  <SmallPicture small bg={`${picture.file}`} />
                  <SmallPictureShade />
                  <RobotoFont>{picture.rank}</RobotoFont>
                  <RankedPictureName>{picture.name}</RankedPictureName>
                  <RankedPictureHashtags>
                    {picture.hashtags.map(
                      hashtag =>
                        hashtag.hashtagName !== contestDate && (
                          <RankedPictureHashtag key={hashtag.id}>
                            {hashtag.hashtagName}
                          </RankedPictureHashtag>
                        )
                    )}
                  </RankedPictureHashtags>
                </RankedPictureContainer>
              ))}
            <RankedPictureContainer>
              <SeeMoreBox />
              <FontSpan>더보기</FontSpan>
            </RankedPictureContainer>
          </RankedPictures>
        </HiddenContainer>
        {picturesLen > 4 && (
          <SlideBtn
            onClick={nextSlide}
            x="650px"
            y="113px"
            src="/PictureSrc/RightArrow.png"
          />
        )}
      </PictureContainer>
    </ContestHeaderContainer>
  );
}

export default ContestHeader;
