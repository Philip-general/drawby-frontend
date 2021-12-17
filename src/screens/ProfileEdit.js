import { gql, useMutation } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Input, Textarea } from "../auth/Input";
import UserIcon from "../components/Common/Avatar";
import { FontLabel, FontSpan } from "../components/Common/Commons";
import useUser from "../hooks/useUser";

const EditContainer = styled.div`
  display: flex;
  padding: 50px 0;
`;

const Column = styled.div`
  margin-right: 80px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const PictureInput = styled(FontLabel)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 3px 10px;
  height: 20px;
  background-color: #f2f2f2;
  border: solid 1px #ccc;
  &:hover {
    background-color: #ccc;
  }
  &:active {
    background-color: #f4f4f4;
  }
`;
const PictureExplanation = styled(FontSpan)`
  margin-top: -10px;
  font-size: 10px;
  margin-bottom: 200px;
  color: #888;
`;
const InputExplanation = styled(FontSpan)`
  display: block;
  margin-left: 110px;
  margin-top: 5px;
  font-size: 10px;
  max-width: 300px;
  color: #888;
`;

const InputWarning = styled(FontSpan)`
  display: block;
  margin-left: 110px;
  margin-top: 5px;
  font-size: 10px;
  max-width: 300px;
  color: ${props => (props.color ? props.color : "tomato")};
`;

const InputContainer = styled.div`
  margin-bottom: 40px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const InputName = styled(FontSpan)`
  font-size: 13px;
  font-weight: 500;
`;

const EditInput = styled(Input)`
  height: 10px;
  width: 270px;
`;

const BioTextarea = styled(Textarea)`
  width: 270px;
  height: 100px;
`;

const SubmitBtn = styled.div`
  cursor: pointer;
  border-radius: 12px;
  border: solid 1px #ccc;
  padding: 12px;
  margin-bottom: 10px;
  background-color: #0e3870;
  width: 150px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  :active {
    background-color: #002860;
  }
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $username: String
    $password: String
    $avatar: Upload
    $bio: String
    $phoneNumber: String
  ) {
    editProfile(
      username: $username
      password: $password
      avatar: $avatar
      bio: $bio
      phoneNumber: $phoneNumber
    ) {
      ok
      error
    }
  }
`;

function ProfileEdit() {
  const { data } = useUser();
  const [preview, setPreview] = useState();
  const [uploadFile, setUploadFile] = useState();
  const [editFinish, setEditFinish] = useState(false);
  const [possiblePw, setPossiblePw] = useState(0);
  const [inputPw, setInputPw] = useState();
  const [samePw, setSamePw] = useState(0);
  const { register, handleSubmit, getValues, setValue } = useForm();
  const setInitialValue = () => {
    setValue("username", data?.me?.username);
    setValue("bio", data?.me?.bio);
  };
  setInitialValue();
  const [editProfileMutation, { data: editData }] = useMutation(
    EDIT_PROFILE_MUTATION,
    { onCompleted: () => setEditFinish(true) }
  );
  const onValid = () => {
    const { username, password, bio } = getValues();
    const input = {
      username: username ? username : data.me.useranme,
      password: password ? password : data.me.password,
      bio: bio ? bio : data.me.bio,
      avatar: uploadFile
    };
    editProfileMutation({
      variables: input
    });
  };
  const showPicture = () => {
    const picture = document.getElementById("file").files[0];
    console.log(picture);
    if (picture) {
      setPreview(URL.createObjectURL(picture));
    } else {
      setPreview(false);
    }
    setUploadFile(picture);
  };

  const onChangePassword = pw => {
    const isOk = pw.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    );
    setInputPw(pw);
    if (isOk) {
      setPossiblePw(true);
    } else {
      setPossiblePw(pw.length);
    }
  };

  const onChangeCheckPassword = checkPw => {
    console.log(checkPw, inputPw);
    const isSame = checkPw === inputPw;
    if (isSame) {
      if (possiblePw === true) {
        setSamePw(true);
      } else {
        setSamePw(1);
      }
    } else {
      setSamePw(checkPw.length);
    }
  };

  return (
    <Fragment>
      {editFinish && <FontSpan>변경된 내용이 저장되었습니다.</FontSpan>}
      <EditContainer>
        <Column>
          {preview ? (
            <UserIcon size="200px" src={preview} />
          ) : (
            <UserIcon size="200px" src={data?.me?.avatar} />
          )}
          <PictureInput htmlFor="file">프로필 그림 변경</PictureInput>
          <input
            style={{ display: "none" }}
            type="file"
            placeholder="그림"
            id="file"
            onChange={() => showPicture()}
          />
          <PictureExplanation>
            아래의 변경 저장 버튼을 눌러야 적용됩니다.
          </PictureExplanation>
        </Column>
        <Column>
          <form
            onSubmit={handleSubmit(onValid)}
            style={{ width: "400px" }}
            autoComplete="off"
          >
            <InputContainer>
              <InputBox>
                <InputName>유저 이름</InputName>
                <EditInput placeholder="유저 이름" {...register("username")} />
              </InputBox>
              <InputExplanation>
                유저 이름은 DrawBy 아이디와 동일하게 여겨집니다.
              </InputExplanation>
              <InputExplanation>
                보안성이 높으면서 작가님의 특징을 잘 담을 수 있는 이름을
                추천합니다.
              </InputExplanation>
            </InputContainer>
            <InputContainer>
              <InputBox>
                <InputName>비밀번호 변경</InputName>
                <EditInput
                  placeholder="비밀번호"
                  {...register("password")}
                  onChange={e => onChangePassword(e.target.value)}
                />
              </InputBox>
              {possiblePw !== 0 && possiblePw !== true && (
                <InputWarning>비밀번호가 잘못되었습니다!</InputWarning>
              )}
              {possiblePw === true && (
                <InputWarning color="blue">
                  사용할 수 있는 비밀번호입니다!
                </InputWarning>
              )}
              <InputExplanation>
                비밀번호 변경을 원하는 경우 작성해주세요.
              </InputExplanation>
              <InputExplanation>
                비밀번호는 반드시 영문자, 숫자, 특수문자의 조합으로 8자
                이상이어야합니다.
              </InputExplanation>
            </InputContainer>
            <InputContainer>
              <InputBox>
                <InputName>비밀번호 재입력</InputName>
                <EditInput
                  placeholder="비밀번호 확인"
                  {...register("checkPassword")}
                  onChange={e => onChangeCheckPassword(e.target.value)}
                />
              </InputBox>
              {samePw !== 0 && samePw !== true && (
                <InputWarning>일치하지 않습니다.</InputWarning>
              )}
              {samePw === true && (
                <InputWarning color="blue">비밀번호가 일치합니다!</InputWarning>
              )}
              <InputExplanation>
                동일한 비밀번호를 입력해주세요.
              </InputExplanation>
            </InputContainer>
            <InputContainer>
              <InputBox>
                <InputName>프로필 소개글</InputName>
                <BioTextarea
                  placeholder="프로필 소개글 작성"
                  {...register("bio")}
                />
              </InputBox>
            </InputContainer>
            <SubmitBtn onClick={handleSubmit(onValid)}>
              변경사항 저장하기
            </SubmitBtn>
          </form>
        </Column>
      </EditContainer>
    </Fragment>
  );
}

export default ProfileEdit;
