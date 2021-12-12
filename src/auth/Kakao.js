import React from "react";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import gql from "graphql-tag";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import routes from "../routes";
import { logUserIn } from "../Apollo";
import { FontSpan } from "../components/Common/Commons";

const buttonBlock = {
  border: "none",
  borderRadius: "12px",
  fontSize: "17px",
  width: "284px",
  fontWeight: "500",
  height: "40px",
  cursor: "pointer",
  background: "#fee500",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  padding: "4px 0px"
};

const KakaoIcon = styled.img`
  width: 22px;
  margin-right: 5px;
`;

const ButtoninnerText = styled(FontSpan)`
  margin: 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
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
        <KakaoIcon src="/PictureSrc/KakaoIcon.png" />
        <ButtoninnerText>카카오 로그인</ButtoninnerText>
      </KakaoLogin>
    </>
  );
};
export default Kakao;
