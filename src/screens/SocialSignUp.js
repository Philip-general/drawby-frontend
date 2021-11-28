import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../auth/Input";
import routes from "../routes";
import { useLocation, useNavigate } from "react-router";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation Mutation(
    $username: String!
    $email: String!
    $socialId: String
    $password: String
    $phoneNumber: String
    $avatar: String
    $bio: String
  ) {
    createAccount(
      username: $username
      email: $email
      socialId: $socialId
      password: $password
      phoneNumber: $phoneNumber
      avatar: $avatar
      bio: $bio
    ) {
      ok
      error
    }
  }
`;

export default function SocialSignUp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { socialId, email } = location.state;
  const onCompleted = data => {
    const {
      createAccount: { ok, error }
    } = data;
    if (!ok) {
      return setError("result", {
        message: error
      });
    } else {
      navigate(routes.home, {
        state: {
          message: "계정이 생성되었습니다. 로그인 해주세요"
        }
      });
    }
  };
  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted
  });
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors }
  } = useForm();
  const onValid = data => {
    console.log(data, socialId);
    createAccount({
      variables: {
        ...data,
        socialId
        // email
      }
    });
  };
  return (
    <div>
      <span>회원가입 페이지(signUp)</span>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          placeholder="username"
          {...register("username", {
            required: "username이 필요합니다."
          })}
        />
        {!email ? (
          <Input
            placeholder="email"
            {...register("email", {
              required: "email이 필요합니다."
            })}
          />
        ) : null}
        <Input placeholder="phoneNumber" {...register("phoneNumber")} />
        <Input placeholder="avatar" {...register("avatar")} />
        <Input placeholder="bio" {...register("bio")} />
        <Input type="submit" value="회원가입하기" />
      </form>
      <div>
        <span>이미 회원이신가요?</span>
        <Link to={routes.home}>로그인하기</Link>
      </div>
    </div>
  );
}
