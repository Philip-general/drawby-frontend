import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";
import { useNavigate } from "react-router";
import { isLoggedInVar, logUserOut } from "./Apollo";
import useUser from "./hooks/useUser";
import { useReactiveVar } from "@apollo/client";
import UserIcon from "./components/Common/Avatar";
const SHeader = styled.header`
  position: fixed;
  top: 0px;
  z-index: 1000;
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

const Button = styled.img`
  cursor: pointer;
  width: 36px;
  margin-right: 10px;
`;

export default function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const navigate = useNavigate();
  const goUpload = () => {
    navigate(routes.uploadPhoto);
  };

  const goMyProfile = () => {
    // navigate(`/profile/${data?.me?.username}`);
    setUserMenu(true);
  };
  const [userMenu, setUserMenu] = useState(false);

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
              <Button onClick={goUpload} src="/PictureSrc/Upload.png" />
              <Button src="/PictureSrc/DMHeader.png" />
              <UserIcon onClick={goMyProfile} size="36px" />
              {userMenu ? <div>asdf</div> : null}
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

// {
//   const logout = () => {
//     logUserOut();
//     navigate(routes.home);
//   };
//   <Button onClick={logout} />
// }
