import { gql, useMutation } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Input, Textarea } from "../auth/Input";
import UserIcon from "../components/Common/Avatar";
import { FontLabel } from "../components/Common/Commons";
import useUser from "../hooks/useUser";

const EditContainer = styled.div`
  display: flex;
  padding: 50px 0;
`;

const Column = styled.div`
  margin-right: 30px;
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
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [editProfileMutation, { data: editData }] = useMutation(
    EDIT_PROFILE_MUTATION,
    { onCompleted: () => setEditFinish(true) }
  );
  const onValid = () => {
    const { username, password, checkPassword, bio } = getValues();
    const input = {
      username: username ? username : data.me.useranme,
      password: password ? password : data.me.password,
      bio: bio ? bio : data.me.bio,
      avatar: uploadFile
    };
    console.log("in onValid");
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
  return (
    <Fragment>
      {editFinish && <div>변경된 내용이 저장되었습니다.</div>}
      <EditContainer>
        <Column>
          {preview ? (
            <UserIcon size="150px" src={preview} />
          ) : (
            <UserIcon size="150px" src={data?.me?.avatar} />
          )}
          <PictureInput for="file">프로필 그림 변경</PictureInput>
          <input
            style={{ display: "none" }}
            type="file"
            placeholder="그림"
            id="file"
            onChange={() => showPicture()}
          />
        </Column>
        <Column>
          <form onSubmit={handleSubmit(onValid)}>
            <Input placeholder="username" {...register("username")} />
            <Input placeholder="password" {...register("password")} />
            <Input placeholder="checkPassword" {...register("checkPassword")} />
            <Textarea placeholder="bio" {...register("bio")} />
            <button onClick={handleSubmit(onValid)}>submit</button>
          </form>
        </Column>
      </EditContainer>
    </Fragment>
  );
}

export default ProfileEdit;
