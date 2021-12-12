import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { logUserIn } from "../Apollo";
import { FontSpan } from "../components/Common/Commons";
import routes from "../routes";

const FacebookLoginBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #4767a9;
  height: 40px;
  width: 284px;
  border-radius: 12px;
  padding: "4px 0px";
  margin-bottom: 5px;
`;

const FacebookIcon = styled.img`
  border: 0px;
  width: 18px;
  margin-right: 5px;
`;

const FacebookText = styled(FontSpan)`
  font-size: 15px;
  font-weight: 500;
  color: #fff;
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

export default function Facebook() {
  const navigate = useNavigate();
  const [socialLogin] = useMutation(SOCIAL_LOGIN_MUTATION);
  const responseFacebook = async response => {
    const { email, id } = response;
    const {
      data: {
        socialLogin: { error, ok, token }
      }
    } = await socialLogin({ variables: { socialId: "fb" + id } });
    if (error && !ok) {
      navigate(routes.socialSignUp, {
        state: { socialId: "fb" + id, email }
      });
    }
    if (ok) {
      logUserIn(token);
    }
  };
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_TEST_KEY}
      autoLoad={false}
      fields="name,email"
      callback={responseFacebook}
      render={renderProps => (
        <FacebookLoginBtn onClick={renderProps.onClick}>
          <FacebookIcon src="/PictureSrc/FacebookIcon.png" />
          <FacebookText>Facebook 로그인</FacebookText>
        </FacebookLoginBtn>
      )}
    />
  );
}
