import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../auth/Input";
import routes from "../routes";
import { useNavigate } from "react-router";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation Mutation(
    $username: String!
    $password: String!
    $email: String!
    $phoneNumber: String
    $avatar: String
    $bio: String
  ) {
    createAccount(
      username: $username
      password: $password
      email: $email
      phoneNumber: $phoneNumber
      avatar: $avatar
      bio: $bio
    ) {
      ok
      error
    }
  }
`;

export default function SignUp() {
  const navigate = useNavigate();
  const onCompleted = data => {
    const {
      createAccount: { ok, error }
    } = data;
    if (!ok) {
      console.log(error);
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
  const [createAccount, { loading, data, error }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted
    }
  );
  const { handleSubmit, register, setError } = useForm();
  const onValid = data => {
    createAccount({
      variables: {
        ...data
      }
    });
  };
  return (
    <div>
      <span>회원가입 페이지(signUp)</span>
      <form onSubmit={handleSubmit(onValid)}>
        <Input placeholder="username" {...register("username")} />
        <Input placeholder="password" {...register("password")} />
        <Input placeholder="email" {...register("email")} />
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
