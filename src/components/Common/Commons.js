import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../NotoSansKR.css";
// font-family를 적용시켜야하는 경우, FontSpan 컴포넌트를 사용하길 추천합니다.
export const FontSpan = styled.div`
  font-family: "Noto Sans KR";
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
`;

export const FontLabel = styled.label`
  font-family: "Noto Sans KR";
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
`;

export const NoLineLink = styled(Link)`
  text-decoration-line: none;
`;
