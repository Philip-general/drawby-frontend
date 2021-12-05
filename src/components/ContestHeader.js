import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ContestHeaderContainer = styled.div``;

const RankedPictures = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
`;
const HiddenContainer = styled.div`
  overflow: hidden;
`;
const ContestName = styled.div``;

const PictureContainer = styled.div`
  display: flex;
  width: 680px;
`;

const RankedPicture = styled.div`
  min-width: 150px;
  max-width: 150px;
  min-height: 150px;
  max-height: 150px;
  background-color: skyblue;
  margin-right: 10px;
`;

const SlideBtn = styled.button``;

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
        <SlideBtn onClick={prevSlide}>👈</SlideBtn>
        <HiddenContainer>
          <RankedPictures ref={slideRef}>
            {rankedPictures.map(picture => (
              <RankedPicture key={picture}>{picture}</RankedPicture>
            ))}
          </RankedPictures>
        </HiddenContainer>
        <SlideBtn onClick={nextSlide}>👉</SlideBtn>
      </PictureContainer>
    </ContestHeaderContainer>
  );
}

export default ContestHeader;
