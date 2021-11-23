import { useQuery, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { logUserIn } from "../Apollo";

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
    const { token, ok, error } = data;
    if (ok) {
      logUserIn(token);
    } else {
      return setError("result", {
        message: error
      });
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
    </div>
  );
}
