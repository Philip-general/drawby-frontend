import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { FontSpan } from "./Common/Commons";

const CaptionContainer = styled.div`
  display: flex;
`;

const Caption = styled(FontSpan)`
  max-width: 642px;
  font-size: 14px;
  font-weight: regular;
  color: ${props => props.color};
  line-height: 1.43;
`;

const CaptionSpread = styled(FontSpan)`
  cursor: pointer;
  margin-left: 3px;
  font-size: 13px;
  margin-bottom: 10px;
  color: #aaa;
`;

function ResizeText({ caption, size = 20, fontColor = "#333" }) {
  const [overSize, setOverSize] = useState(false);
  const [readMore, setReadMore] = useState(false);
  useEffect(() => {
    if (caption.length > size) {
      setOverSize(true);
    }
  }, [caption]);
  return (
    <Fragment>
      {((overSize && readMore) || !overSize) && (
        <Caption color={fontColor}>{caption}</Caption>
      )}
      {overSize && !readMore && (
        <CaptionContainer>
          <Caption color={fontColor}>{caption.slice(0, size)}...</Caption>
          <CaptionSpread onClick={() => setReadMore(true)}>
            더보기
          </CaptionSpread>
        </CaptionContainer>
      )}
    </Fragment>
  );
}

export default ResizeText;
