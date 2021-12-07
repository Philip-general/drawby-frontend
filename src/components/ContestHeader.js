import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
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
  min-width: 137px;
  max-width: 137px;
  min-height: 137px;
  max-height: 137px;
  border-radius: 8px;
  background-color: skyblue;
  margin-right: 10px;
  overflow-wrap: break-word;
`;

const SlideBtn = styled.img`
  width: 66px;
  height: 66px;
  position: absolute;
  top: ${props => (props.y ? props.y : "108px")};
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
    const space = currentSlide * 152;
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${space}px)`;
  }, [currentSlide]);

  // test contest array
  const rankedPictures = [
    { id: "1", file: "/PictureSrc/BookmarkOff.png", caption: "First" },
    { id: "2", file: "/PictureSrc/BookmarkOn.png", caption: "Second" },
    { id: "3", file: "/PictureSrc/Calender.png", caption: "Third" },
    { id: "4", file: "/PictureSrc/Comment.png", caption: "Ohyeah" },
    { id: "5", file: "/PictureSrc/ContestBtn.png", caption: "Caption!" },
    { id: "6", file: "/PictureSrc/ContestGalleryOff.png", caption: "qwerty" },
    { id: "7", file: "/PictureSrc/ContestGalleryOn.png", caption: "asdfgg" },
    { id: "8", file: "/PictureSrc/DM.png", caption: "eighhhht" },
    { id: "9", file: "/PictureSrc/Imark.png", caption: "NINE!!" },
    { id: "10", file: "/PictureSrc/Pass.png", caption: "Teeeeeeeen" },
    { id: "더보기", file: "", caption: "" }
  ];
  return (
    <ContestHeaderContainer>
      <ContestName>#12월 첫째주</ContestName>
      <PictureContainer>
        <SlideBtn
          onClick={prevSlide}
          x="-35px"
          src="/PictureSrc/LeftArrow.png"
        />
        <HiddenContainer>
          <RankedPictures ref={slideRef}>
            {rankedPictures.map(picture => (
              <RankedPictureContainer key={picture.id}>
                <SmallPicture small bg={`${picture.file}`} />
                <FontSpan>{picture.caption}</FontSpan>
              </RankedPictureContainer>
            ))}
          </RankedPictures>
        </HiddenContainer>
        <SlideBtn
          onClick={nextSlide}
          x="650px"
          y="113px"
          src="/PictureSrc/RightArrow.png"
        />
      </PictureContainer>
    </ContestHeaderContainer>
  );
}

export default ContestHeader;
