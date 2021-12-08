import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";
import { useNavigate } from "react-router";
import { isLoggedInVar, logUserOut } from "./Apollo";
import useUser from "./hooks/useUser";
import { useReactiveVar } from "@apollo/client";
import UserIcon from "./components/Common/Avatar";
import { FontSpan } from "./components/Common/Commons";
import { ModalBackground } from "./components/Common/Modal";
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

const Column = styled.div`
  display: flex;
  align-items: center;
`;

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

const UserMenuContainer = styled.div`
  position: fixed;
  top: 61px;
  right: 0px;
  width: 280px;
  padding: 12px 5px;
  border-radius: 10px;
  margin-right: 40px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
`;

const UserMenuBox = styled.div``;

const UserMenuBtns = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserMenuBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 10px;
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  :hover {
    background-color: #fafafa;
  }
`;

const UserMenuIcon = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 12px;
`;

const UserMenuArrow = styled.img`
  width: 6px;
  height: 12px;
`;

const UserMenuText = styled(FontSpan)`
  color: #333333;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.33;
`;

export default function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const navigate = useNavigate();
  const goUpload = () => {
    navigate(routes.uploadPhoto);
  };

  const goUserProfile = () => {
    setUserMenu(false);
    navigate(`/profile/${data?.me?.username}`);
  };
  const [userMenu, setUserMenu] = useState(false);
  const toggleUserMenu = () => {
    setUserMenu(!userMenu);
  };

  function UserMenu() {
    return (
      <UserMenuContainer>
        <UserMenuBox>
          <UserMenuBtns>
            <UserMenuBtn onClick={() => goUserProfile()}>
              <Column>
                <UserMenuIcon src={"/PictureSrc/Copy.png"} />
                <UserMenuText>갤러리</UserMenuText>
              </Column>
              <UserMenuArrow src="/PictureSrc/Pass.png" />
            </UserMenuBtn>
            <UserMenuBtn>
              <Column>
                <UserMenuIcon src={"/PictureSrc/UserIcon.png"} />
                <UserMenuText>프로필 수정</UserMenuText>
              </Column>
              <UserMenuArrow src="/PictureSrc/Pass.png" />
            </UserMenuBtn>
            <UserMenuBtn>
              <Column>
                <UserMenuIcon src={"/PictureSrc/Setting.png"} />
                <UserMenuText>설정</UserMenuText>
              </Column>
              <UserMenuArrow src="/PictureSrc/Pass.png" />
            </UserMenuBtn>
            <UserMenuBtn>
              <Column>
                <UserMenuIcon src={"/PictureSrc/LogOut.png"} />
                <UserMenuText>로그아웃</UserMenuText>
              </Column>
              <UserMenuArrow src="/PictureSrc/Pass.png" />
            </UserMenuBtn>
          </UserMenuBtns>
        </UserMenuBox>
      </UserMenuContainer>
    );
  }

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
              <UserIcon onClick={toggleUserMenu} size="36px" />
            </BtnContainer>
          </Column>
        ) : (
          <Column>
            <Button>로그인</Button>
          </Column>
        )}
      </Wrapper>
      {userMenu && <UserMenu />}
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
