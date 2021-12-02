import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";

const SHeader = styled.header`
  width: 100%;
  height: 60px;
  padding: 12px 40px 12px 19px;
  background-color: #fff;
  box-shadow: 0 10px 0px 0 rgba(0, 0, 0, 0.06);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 102.7px;
  height: 30.3px;
  margin: 2.8px 678.3px 2.8px 0;
`;

const Column = styled.div``;

const SearchBox = styled.div``;

const BtnContainer = styled.div`
  display: flex;
`;

const Button = styled.div`
  margin-right: 10px;
`;

export default function Header() {
  const isLoggedIn = true;
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
              <Button>업로드</Button>
              <Button>DM</Button>
              <Button>내 프로필</Button>
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
