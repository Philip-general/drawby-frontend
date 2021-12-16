import styled from "styled-components";
import "../NotoSansKR.css";

export const Input = styled.input`
  font-family: "Noto Sans KR";
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  display: block;
  border-radius: 12px;
  border: solid 1px #ccc;
  padding: 14.5px;
  &:focus {
    border-color: aqua;
  }
`;

export const Textarea = styled.textarea`
  font-family: "Noto Sans KR";
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  display: block;
  border-radius: 12px;
  border: solid 1px #ccc;
  padding: 14.5px;
  resize: none;
  &:focus {
    border-color: aqua;
  }
`;
