import React from "react";
import styled from "styled-components";
import Input from "../auth/Input";
import DragDrop from "../components/DragDrop";

const BackGround = styled.div`
  width: 100vw;
  height: 200vh;
  background-color: #717171;
`;
const ModalBox = styled.div`
  width: 500px;
  height: auto;
  margin: 0 64px 66px 0;
  padding: 12px 12px 12px 16px;
  border-radius: 10px;
  background-color: #fff;
`;
const ImgBox = styled.div`
  width: 468px;
  height: 468px;
  margin: 20px 4px 16px 0;
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const UploadInput = styled(Input)`
  width: 85%;
`;
const SubminButton = styled.button`
  width: 60px;
  height: 32px;
  padding: 6px 17px;
  border-radius: 16px;
  background-color: #0e3870;
`;

const InnerButtonText = styled.span`
  font-family: NotoSansKR;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;

export default function Upload() {
  return (
    <BackGround>
      <span>Upload Page</span>
      <ModalBox>
        <span>그림 업로드</span>
        <ImgBox>여기에 이미지들어감</ImgBox>
        <UploadInput placeholder="그림의 제목을 입력하세요" />
        <UploadInput placeholder="그림의 설명을 입력하세요" />
        <UploadInput placeholder="#을 통해 해시태그를 입력하세요" />
        <SubminButton>
          <InnerButtonText>다음</InnerButtonText>
        </SubminButton>
      </ModalBox>
    </BackGround>
  );
}
