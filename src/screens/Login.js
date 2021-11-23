import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm();
  const onSubmit = data => {
    const { username, password } = data;
    console.log(username, password);
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
