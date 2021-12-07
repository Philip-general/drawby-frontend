import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";
import { useNavigate } from "react-router";
import { isLoggedInVar, logUserOut } from "./Apollo";
import useUser from "./hooks/useUser";
import { useReactiveVar } from "@apollo/client";
const SHeader = styled.header`
  width: 100%;
  max-width: 1440px;
  height: 36px;
  padding: 12px 0 12px;
  background: #fff;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 102.7px;
  height: 30.3px;
  margin-left: 19px;
`;

const Column = styled.div``;

const SearchBox = styled.div``;

const BtnContainer = styled.div`
  display: flex;
  margin-right: 40px;
`;

const Button = styled.div`
  cursor: pointer;
  margin-right: 10px;
`;

export default function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const navigate = useNavigate();
  const goUpload = () => {
    navigate(routes.uploadPhoto);
  };
  const logout = () => {
    logUserOut();
    navigate(routes.home);
  };
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <Logo src="/PictureSrc/Logo.png" />
          </Link>
        </Column>
        <Column>
          <SearchBox>검색창</SearchBox>
        </Column>
        {isLoggedIn ? (
          <Column>
            <BtnContainer>
              <Button onClick={goUpload}>업로드</Button>
              <Button>DM</Button>
              <Link to={`/profile/${data?.me?.username}`}>
                <Button>내 프로필</Button>
              </Link>
              <Button onClick={logout}>로그아웃</Button>
            </BtnContainer>
          </Column>
        ) : (
          <Column>
            <Button>로그인</Button>
          </Column>
        )}
      </Wrapper>
    </SHeader>
  );
}
