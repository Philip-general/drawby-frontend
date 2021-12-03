import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router";
import { logUserIn } from "../Apollo";
import routes from "../routes";

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
    />
  );
}
