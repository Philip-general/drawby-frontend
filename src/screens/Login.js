import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { logUserIn } from "../Apollo";
import { Input } from "../auth/Input";
import routes from "../routes";
import { useLocation } from "react-router";
import Facebook from "../auth/Facebook";
import Kakao from "../auth/Kakao";
import PageTitle from "../components/PageTitle";
import styled from "styled-components";
import { FontSpan, NoLineLink } from "../components/Common/Commons";

const Background = styled.div`
  background-color: #fafafa;
  height: 100vh;
  display: flex;
  padding: 50px 100px;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
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

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 40px;
`;

const LoginInput = styled(Input)`
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

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SignUpText = styled(FontSpan)`
  margin-right: 10px;
  font-size: 13px;
  font-weight: 500;
  color: ${props => (props.link === "true" ? "#0e3870" : "#9d9d9d")};
`;

const LoginLogo = styled.img`
  margin-right: 100px;
  width: 350px;
  height: 300px;
  margin-bottom: 30px;
`;
const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      error
      ok
    }
  }
`;

export default function Login() {
  // 회원가입 완료되었을 때 완료되었다는 메세지를 넘겨줘서 받아주는 것
  const location = useLocation();
  const createAccountSuccess = location?.state?.message;

  const onCompleted = data => {
    const {
      login: { token, ok, error }
    } = data;
    if (!ok) {
      return setError("result", {
        message: error
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted
  });
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm();

  const onSubmit = data => {
    const { username, password } = data;
    if (data) {
      login({
        variables: { username, password }
      });
    }
  };

  return (
    <Background>
      <PageTitle title="Login" />
      <LoginLogo src="/PictureSrc/LoginLogo.png" />
      <LoginContainer>
        <LoginBox>
          {createAccountSuccess ? (
            <FontSpan>{createAccountSuccess}</FontSpan>
          ) : null}
          <form onSubmit={handleSubmit(onSubmit)}>
            <LoginInput placeholder="유저이름" {...register("username")} />
            <LoginInput
              placeholder="비밀번호"
              {...register("password")}
              // type="password"
            />
            <LoginBtn onClick={handleSubmit(onSubmit)}>로그인</LoginBtn>
          </form>
          <SignUpContainer>
            <SignUpText>회원이 아니신가요?</SignUpText>
            <NoLineLink to={routes.signUp}>
              <SignUpText link="true">회원가입하기</SignUpText>
            </NoLineLink>
          </SignUpContainer>
        </LoginBox>
        <LoginBox>
          <Facebook />
          <Kakao />
        </LoginBox>
      </LoginContainer>
    </Background>
  );
}
