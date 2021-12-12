import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "../auth/Input";
import routes from "../routes";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { FontSpan } from "../components/Common/Commons";

const Background = styled.div`
  background-color: #fafafa;
  display: flex;
  padding: 50px 100px;
  justify-content: center;
  align-items: center;
`;

const SignUpContainer = styled.div`
  display: inline-block;
  max-width: 300px;
  /* margin: 40px 30px 100px; */
  height: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 16px;
  border-radius: 10px;
  background-color: inherit;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const SignUpBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 40px;
`;

const SignUpInput = styled(Input)`
  background-color: #fafafa;
  margin-bottom: 8px;
  width: 250px;
  height: 12px;
`;

const LoginBtn = styled.div`
  cursor: pointer;
  border-radius: 12px;
  border: solid 1px #ccc;
  padding: 14.5px;
  margin-bottom: 10px;
  background-color: #0e3870;
  width: 250px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  :active {
    background-color: #002860;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginText = styled(FontSpan)`
  margin-right: 10px;
  font-size: 13px;
  font-weight: 500;
  color: ${props => (props.link === "true" ? "#0e3870" : "#9d9d9d")};
`;

const LoginLogo = styled.img`
  margin-right: 100px;
  width: 350px;
  height: 300px;
  margin-bottom: 48px;
`;
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
    createAccount({
      variables: {
        ...data
      }
    });
  };
  return (
    <Background>
      <LoginLogo src="/PictureSrc/LoginLogo.png" />
      <SignUpContainer>
        <SignUpBox>
          <form onSubmit={handleSubmit(onValid)}>
            <SignUpInput
              placeholder="username"
              {...register("유저이름", {
                required: "username이 필요합니다."
              })}
            />
            <SignUpInput
              placeholder="password"
              {...register("비밀번호", {
                required: "password가 필요합니다."
              })}
            />
            <SignUpInput
              placeholder="email"
              {...register("이메일", {
                required: "email이 필요합니다."
              })}
            />
            <SignUpInput placeholder="전화번호" {...register("phoneNumber")} />
            {/* <SignUpInput placeholder="avatar" {...register("avatar")} />
            <SignUpInput placeholder="bio" {...register("bio")} /> */}
            <Input type="submit" value="회원가입하기" />
          </form>
        </SignUpBox>
        <LoginContainer>
          <LoginText>이미 회원이신가요?</LoginText>
          <Link to={routes.home}>
            <LoginText link="true">로그인하기</LoginText>
          </Link>
        </LoginContainer>
      </SignUpContainer>
    </Background>
  );
}
