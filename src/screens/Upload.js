import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Input from "../auth/Input";
import DragDrop from "../components/DragDrop";
import routes from "../routes";

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
  width: 400px;
  height: 400px;
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

const UPLOAD_PICTURE_MUTATION = gql`
  mutation Mutation($file: Upload!, $name: String!, $caption: String) {
    uploadPicture(file: $file, name: $name, caption: $caption) {
      ok
      error
    }
  }
`;

export default function Upload() {
  const navigate = useNavigate();
  const onCompleted = data => {
    const {
      uploadPicture: { ok, error }
    } = data;
    if (!ok) {
      return setError("result", {
        message: error
      });
    } else {
      navigate(routes.home);
    }
  };
  const [uploadPicture] = useMutation(UPLOAD_PICTURE_MUTATION, {
    onCompleted
  });

  const { register, handleSubmit, setError } = useForm();

  const onValid = data => {
    uploadPicture({
      variables: {
        ...data
      }
    });
  };

  return (
    <BackGround>
      <span>Upload Page</span>
      <ModalBox>
        <span>그림 업로드</span>
        <form onSubmit={handleSubmit(onValid)}>
          <ImgBox>여기에 이미지들어감</ImgBox>
          <input
            {...register("file", {
              required: "file을 업로드해주세요"
            })}
            type="file"
          />
          <UploadInput
            {...register("name", {
              required: "제목을 입력해주세요"
            })}
            placeholder="그림의 제목을 입력하세요"
          />
          <UploadInput
            {...register("caption")}
            placeholder="그림의 설명을 입력하세요"
          />
          {/* 백엔드에서 해시태그를 따로 받도록 수정이 필요함 */}
          <UploadInput placeholder="#을 통해 해시태그를 입력하세요" />
          <SubminButton type="submit">
            <InnerButtonText>다음</InnerButtonText>
          </SubminButton>
        </form>
      </ModalBox>
    </BackGround>
  );
}
