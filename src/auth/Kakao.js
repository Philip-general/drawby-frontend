import React from "react";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import gql from "graphql-tag";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import routes from "../routes";
import { logUserIn } from "../Apollo";

const buttonBlock = {
  border: "none",
  borderRadius: "9px",
  fontSize: "17px",
  width: "284px",
  fontWeight: "500",
  height: "32px",
  cursor: "pointer",
  background: "#fae101",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  padding: "4px 0px"
};

const ButtoninnerText = styled.h3`
  margin: 0;
  font-size: 14px;
`;

const SOCIAL_LOGIN_MUTATION = gql`
  mutation Mutation($socialId: String!) {
    socialLogin(socialId: $socialId) {
      ok
      error
      token
    }
  }
`;

const Kakao = () => {
  const navigate = useNavigate();
  const [socialLogin] = useMutation(SOCIAL_LOGIN_MUTATION);
  const oAuthLoginHandler = async response => {
    const { id, email } = response.profile;
    const {
      data: {
        socialLogin: { error, ok, token }
      }
    } = await socialLogin({ variables: { socialId: "kakao" + id } });

    if (error && !ok) {
      navigate(routes.socialSignUp, {
        state: { socialId: "kakao" + id, email }
      });
    }
    if (ok) {
      logUserIn(token);
    }
  };
  return (
    <>
      <KakaoLogin
        token={process.env.REACT_APP_KAKAO_JS_KEY}
        buttonText="kakao"
        onSuccess={oAuthLoginHandler}
        onFail={console.error}
        onLogout={console.info}
        style={buttonBlock}
      >
        <ButtoninnerText>카카오 계정으로 로그인</ButtoninnerText>
      </KakaoLogin>
    </>
  );
};
export default Kakao;
