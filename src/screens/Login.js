import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { logUserIn } from "../Apollo";
import Input from "../auth/Input";
import routes from "../routes";
import { useLocation } from "react-router";
import Facebook from "../auth/Facebook";
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
    <div>
      <span>로그인 페이지</span>
      {createAccountSuccess ? <div>{createAccountSuccess}</div> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="username" {...register("username")} />
        <Input placeholder="password" {...register("password")} />
        <Input type="submit" value="로그인" />
      </form>
      <div>
        <span>회원이 아니신가요?</span>
        <Link to={routes.signUp}>회원가입하기</Link>
        <Facebook />
      </div>
    </div>
  );
}
