import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { FontSpan } from "../components/Common/Commons";
import { useForm } from "react-hook-form";
import { Input, Textarea } from "../auth/Input";
import { useNavigate } from "react-router";
import useUser from "../hooks/useUser";
import useDate from "../hooks/useDate.js";
// just some styled components for the image upload area
const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const BackGround = styled.div`
  background-color: #717171;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const ModalBox = styled.div`
  display: inline-block;
  max-width: 1000px;
  margin: 40px 30px 100px;
  height: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 30px 12px 12px 16px;
  border-radius: 10px;
  border-color: ${props => getColor(props)};
  background-color: #fff;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const ModalHeader = styled.div`
  display: flex;
  margin-right: 10px;
  justify-content: space-between;
  color: #333333;
  div {
    font-weight: 500;
  }
`;

const ModalBody = styled.div`
  display: flex;
  margin-top: 20px;
`;

const ThumbsContainer = styled.div`
  width: 468px;
  height: 468px;
  display: flex;
  margin: 0 22px 21px 0px;
  border-radius: 10px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #c2c2c2;
`;

const ImgIcon = styled.img`
  margin-bottom: 10px;
  width: ${props => (props.exit === "true" ? "26px" : "70px")};
  height: ${props => (props.exit === "true" ? "26px" : "70px")};
`;

const Img = styled.img`
  display: block;
  width: inherit;
  height: 100%;
  border-radius: inherit;
`;

const ErrorMessage = styled(FontSpan)`
  color: #c45e5e;
`;

const BlueBtn = styled.button`
  cursor: pointer;
  height: 32px;
  padding: 0 12px;
  border: solid 1px #ccc;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: #0e3870;
  color: #fff;
  font-size: 14px;
  &:active {
    background-color: #3e68a0;
  }
`;

const NameInput = styled(Input)`
  border-color: #cccccc;
  ::placeholder {
    color: #cccccc;
  }
  margin-bottom: 20px;
  min-width: 468px;
`;

const CaptionInput = styled(Textarea)`
  border-color: #cccccc;
  height: 365px;
  resize: none;
  width: 468px;
  ::placeholder {
    color: #cccccc;
  }
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContestCheckbox = styled.button`
  cursor: pointer;
  display: flex;
  padding: 2px 12px;
  background-color: ${props => (props.clicked ? "#0e3870" : "#f1f1f1")};
  color: ${props => (props.clicked ? "#fff" : "black")};
  border: solid 1px #ccc;
  border-radius: 10px;
  &:active {
    background-color: ${props => (props.clicked ? "#3e68a0" : "#ccc")};
  }
`;

// relevant code starts here
const UPLOAD_PICTURE_MUTATION = gql`
  mutation uploadPicture($file: Upload!, $name: String!, $caption: String) {
    uploadPicture(file: $file, name: $name, caption: $caption) {
      ok
      id
      error
      file
      caption
      name
      hashtags {
        id
        hashtagName
      }
    }
  }
`;

const CREATE_FEED_MUTATION = gql`
  mutation createFeed($pictureId: Int!) {
    createFeed(pictureId: $pictureId) {
      ok
      error
    }
  }
`;

const Upload = ({ register: uploadRegister }) => {
  const { year, month, weekNo } = useDate(new Date());
  const [preview, setPreview] = useState();
  const [errors, setErrors] = useState();
  const [uploadFile, setUploadFile] = useState();
  const [uploadContest, setUploadContest] = useState(false);
  const [uploadPicture, { loading }] = useMutation(UPLOAD_PICTURE_MUTATION);
  const [createFeed] = useMutation(CREATE_FEED_MUTATION);
  const onDrop = useCallback(
    async ([file]) => {
      if (file) {
        setPreview(URL.createObjectURL(file));
        setUploadFile(file);
      } else {
        setErrors("Something went wrong. Check file type");
      }
    },
    [uploadPicture]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png"
    // maxSize: 1024000
  });
  const navigate = useNavigate();

  const deletePicture = () => {
    setPreview(null);
    setUploadFile(null);
  };
  const { data: userData } = useUser();
  const { register, handleSubmit, getValues } = useForm();
  const createFeedUpdate = (
    cache,
    result,
    id,
    file,
    caption,
    name,
    hashtags
  ) => {
    const {
      data: {
        createFeed: { ok }
      }
    } = result;
    if (ok && id && file && caption && name && userData?.me) {
      const newPicture = {
        __typename: "Picture",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        author: { ...userData.me },
        file,
        name,
        caption,
        hashtags,
        totalLike: 0,
        isLiked: false,
        isBookmarked: false,
        totalComment: 0,
        comments: []
      };
      console.log(newPicture);
      const newCachePicture = cache.writeFragment({
        data: newPicture,
        fragment: gql`
          fragment picture on Picture {
            id
            createdAt
            isMine
            author {
              username
              avatar
            }
            file
            name
            hashtags
            totalLike
            isLiked
            isBookmarked
            totalComment
            comments
          }
        `
      });
      cache.modify({
        id: `User:${userData.me.username}`,
        fields: {
          pictures(prev) {
            return [...prev, newCachePicture];
          }
        }
      });
    }
  };
  const onCompletedUploadPicture = result => {
    const {
      uploadPicture: { ok, id, file, caption, name, hashtags }
    } = result;
    if (ok && id) {
      createFeed({
        variables: { pictureId: id },
        update: (cache, feedResult) =>
          createFeedUpdate(cache, feedResult, id, file, caption, name, hashtags)
      });
    }
    navigate(`/`);
  };
  const onValid = () => {
    if (!uploadFile) {
      setErrors("그림을 추가하지 않았습니다. 그림을 추가해주세요.");
      return;
    }
    const { name, caption } = getValues();
    let captions = caption;
    if (uploadContest) {
      captions += " #" + year + "년_" + month + "월_" + weekNo + "주차";
    }
    uploadPicture({
      variables: { file: uploadFile, name, caption: captions },
      onCompleted: result => onCompletedUploadPicture(result)
    });
  };
  console.log(uploadContest);

  return (
    <BackGround>
      <ModalBox>
        <ModalHeader>
          <FontSpan>그림 업로드</FontSpan>
          <ImgIcon
            exit="true"
            src="/PictureSrc/Exit.png"
            onClick={() => navigate(-1)}
          />
        </ModalHeader>
        <ModalBody>
          <div>
            <ThumbsContainer
              {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            >
              {!preview ? (
                <>
                  <input {...getInputProps()} />
                  <ImgIcon src="/PictureSrc/Image.png" />
                  {!isDragActive ? (
                    errors ? (
                      <ErrorMessage>{errors}</ErrorMessage>
                    ) : (
                      <FontSpan>
                        이곳을 클릭하거나 그림을 드래그 하세요.
                      </FontSpan>
                    )
                  ) : (
                    <FontSpan>그림을 이곳에 놓으세요.</FontSpan>
                  )}
                </>
              ) : (
                <Img src={preview} />
              )}
            </ThumbsContainer>
            <BlueBtn onClick={() => deletePicture()}>그림 지우기</BlueBtn>
          </div>
          <form onSubmit={handleSubmit(onValid)}>
            <NameInput
              {...register("name", { required: "제목을 입력해주세요." })}
              placeholder="그림의 제목을 입력해주세요."
            />
            <CaptionInput
              {...register("caption")}
              placeholder="그림의 설명을 입력해주세요."
            />
            <ModalFooter>
              <BlueBtn type="submit">
                <FontSpan>다음</FontSpan>
              </BlueBtn>
              <ContestCheckbox
                clicked={uploadContest}
                onClick={() => setUploadContest(!uploadContest)}
              >
                <FontSpan>이번주 콘테스트 참가</FontSpan>
              </ContestCheckbox>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalBox>
    </BackGround>
  );
};

export default Upload;

// register를 이용하여 뭔가가 있었음 이건 분석해봐야함.
//  {data && data.uploadFile && (
//     <input
//       type="hidden"
//       name="avatarUrl"
//       value={data.uploadFile.Location}
//       ref={register}
//     />
//   )}
