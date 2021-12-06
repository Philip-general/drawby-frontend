import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontSpan } from "./Common/Commons";

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

const RankedPicture = styled.div`
  min-width: 150px;
  max-width: 150px;
  min-height: 150px;
  max-height: 150px;
  border-radius: 8px;
  background-color: skyblue;
  margin-right: 10px;
`;

const SlideBtn = styled.img`
  width: 66px;
  height: 66px;
  position: absolute;
  top: ${props => (props.y ? props.y : "183px")};
  z-index: 1;
  left: ${props => props.x};
`;

function ContestHeader() {
  const TOTAL_SLIDE = 7;
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
    const space = currentSlide * 160;
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${space}px)`;
  }, [currentSlide]);

  const rankedPictures = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "더보기"
  ];
  return (
    <ContestHeaderContainer>
      <ContestName>#12월 첫째주</ContestName>
      <PictureContainer>
        <SlideBtn
          onClick={prevSlide}
          x="390px"
          src="/PictureSrc/LeftArrow.png"
        />
        <HiddenContainer>
          <RankedPictures ref={slideRef}>
            {rankedPictures.map(picture => (
              <RankedPicture key={picture}>{picture}</RankedPicture>
            ))}
          </RankedPictures>
        </HiddenContainer>
        <SlideBtn
          onClick={nextSlide}
          x="1078px"
          y="188px"
          src="/PictureSrc/RightArrow.png"
        />
      </PictureContainer>
    </ContestHeaderContainer>
  );
}

export default ContestHeader;
