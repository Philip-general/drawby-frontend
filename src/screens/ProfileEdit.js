import { gql, useMutation } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Input, Textarea } from "../auth/Input";
import UserIcon from "../components/Common/Avatar";
import useUser from "../hooks/useUser";

const EditContainer = styled.div`
  display: flex;
`;

const UserContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100%;
`;

const TestView = styled.img`
  width: inherit;
  height: inherit;
  border-radius: inherit;
`;

const Column = styled.div`
  margin-right: 30px;
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
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [editProfileMutation, { data: editData }] = useMutation(
    EDIT_PROFILE_MUTATION,
    { onCompleted: () => console.log(editData) }
  );
  const onValid = () => {
    const { username, password, checkPassword, bio } = getValues();
    console.log("in onValid");
    editProfileMutation({
      variables: { username, password, avatar: uploadFile, bio }
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
      <EditContainer>
        <Column>
          {preview ? (
            <UserIcon size="100px" src={preview} />
          ) : (
            <UserIcon size="100px" src={data?.me?.avatar} />
          )}
          <Input
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
