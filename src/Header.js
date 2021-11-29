import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";
import { useNavigate } from "react-router";
const SHeader = styled.header`
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  max-width: 100px;
`;

const Column = styled.div``;

const SearchBox = styled.div``;

const BtnContainer = styled.div`
  display: flex;
`;

const Button = styled.div`
  cursor: pointer;
  margin-right: 10px;
`;

export default function Header() {
  const isLoggedIn = true;
  const navigate = useNavigate();
  const goUpload = () => {
    navigate(routes.uploadPhoto);
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
