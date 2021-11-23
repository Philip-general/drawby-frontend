import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { logUserIn } from "../Apollo";
import routes from "../routes";

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
  const onCompleted = data => {
    const {
      login: { token, ok, error }
    } = data;
    console.log(token, ok, error);
    if (!ok) {
      return setError("result", {
        message: error
      });
    }
    if (token) {
      console.log(token);
      logUserIn(token);
    }
  };
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted
  });
  const {
    setError,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm();

  const onSubmit = data => {
    const { username, password } = data;
    if (data) {
      console.log(username, password);
      login({
        variables: { username, password }
      });
    }
  };

  return (
    <div>
      <span>로그인 페이지</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="username" {...register("username")} />
        <input placeholder="password" {...register("password")} />
        <input type="submit" value="로그인" />
      </form>
      <div>
        <span>회원이 아니신가요?</span>
        <Link to={routes.signUp}>회원가입하기</Link>
      </div>
    </div>
  );
}
