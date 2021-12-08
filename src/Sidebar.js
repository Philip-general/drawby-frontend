import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontSpan } from "./components/Common/Commons";
import useUser from "./hooks/useUser";
import routes from "./routes";

const SidebarContainer = styled.div`
  width: 240px;
  position: fixed;
  top: 61px;
  z-index: 1000;
  max-height: 1400px;
  margin: 0 180px 0 0;
  padding: 20px 0 200px;
  box-shadow: 3px 0 30px 0 rgba(0, 0, 0, 0.06);
  background-color: #fff;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`;

const Icon = styled.img`
  width: ${props => (props.width ? props.width : "30px")};
  height: ${props => (props.height ? props.height : "30px")};
  margin-right: 10px;
  margin-left: ${props => (props.left ? props.left : "0px")};
  object-fit: contain;
`;

const PassIcon = styled.img`
  width: 6px;
  height: 12px;
`;

const MenuBtn = styled(Link)`
  text-decoration-line: none;
  height: 50px;
  margin-left: ${props => (props.sub === "true" ? "0px" : "20px")};
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const SidebarBtn = styled(FontSpan)`
  padding: 10px 14px 10px 0;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.4;
  text-align: left;
  color: #333;
`;

const DetailContainer = styled.div`
  background-color: #fafafa;
  padding: 0 0 20px 27px;
  text-align: center;
`;
const DetailBox = styled.div`
  margin-top: 10px;
  align-items: center;
  display: flex;
`;

const HashtagBtn = styled(FontSpan)`
  align-items: center;
  min-width: 160px;
  height: 20px;
  font-size: 14px;
  font-weight: regular;
  line-height: 1.43;
  text-align: left;
  color: #555;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  opacity: 1;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 2;
  top: 20%;
  left: 36%;
  width: 500px;
  height: 60%;
  padding: 12px 12px 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #ffffff;
`;

const ModalHeader = styled.div`
  justify-content: space-between;
  margin-top: 10px;
  display: flex;
`;
const ModalName = styled.div`
  margin-left: 10px;
`;

const CloseBtn = styled.div`
  background-color: red;
  width: 50px;
  height: 20px;
`;

const ModalBody = styled.div`
  background-color: white;
  width: 94%;
  height: 60%;
  margin: 3%;
`;

const ModalHashtagBtn = styled.button`
  background-color: aliceblue;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const BlankSpace = styled.div`
  width: 100px;
  height: 200px;
`;

function Sidebar({ openModal }) {
  const { data } = useUser();
  // user가 follow 하는 hashtag 목록 (사이드바에 고정하는 것과 아닌 것들을 분리해야함)
  const hashtags = data?.me?.followHashtags.map(
    hashtag => hashtag.hashtagName.split("#")[1]
  );
  const contests = ["11월 첫째주", "11월 둘째주", "11월 셋째주"];
  // user가 follow하는 모든 hashtag들
  const modalHashtags = [];
  const [hashtagMenu, setHashtagMenu] = useState(false);
  const [contestMenu, setContestMenu] = useState(false);
  const openHashtagMenu = () => {
    setHashtagMenu(true);
  };
  const closeHashtagMenu = e => {
    if (e.target === e.currentTarget) {
      setHashtagMenu(false);
    }
  };
  const openContestMenu = () => {
    setContestMenu(true);
  };
  const closeContestMenu = e => {
    if (e.target === e.currentTarget) {
      setContestMenu(false);
    }
  };
  function HashtagMenu() {
    return (
      <ModalContainer onClick={closeHashtagMenu}>
        <Modal>
          <ModalHeader>
            <ModalName>HashtagMenu</ModalName>
            <CloseBtn onClick={closeHashtagMenu}>X</CloseBtn>
          </ModalHeader>
          <ModalBody>
            {modalHashtags
              ? modalHashtags.map(hashtag => (
                  <ModalHashtagBtn key={hashtag}>{hashtag}</ModalHashtagBtn>
                ))
              : null}
          </ModalBody>
          <ModalFooter>
            <CloseBtn onClick={closeHashtagMenu}>Save!</CloseBtn>
          </ModalFooter>
        </Modal>
      </ModalContainer>
    );
  }
  function ContestMenu() {
    return (
      <ModalContainer onClick={closeContestMenu}>
        <Modal>
          <ModalHeader>
            <ModalName>ContestMenu</ModalName>
            <CloseBtn onClick={closeContestMenu}>X</CloseBtn>
          </ModalHeader>
          <ModalBody>여기는 달력이 들어갈 자리입니다.</ModalBody>
        </Modal>
      </ModalContainer>
    );
  }
  return (
    <SidebarContainer>
      <MenuBtn to={routes.home}>
        <Icon src="/PictureSrc/HomeBtn.png" />
        <SidebarBtn>홈으로 가기</SidebarBtn>
      </MenuBtn>
      <MenuBtn to={routes.notYet}>
        <Icon src="/PictureSrc/HashtagBtn.png" />
        <SidebarBtn>관심사 피드</SidebarBtn>
      </MenuBtn>
      <DetailContainer>
        {hashtags
          ? hashtags.map(hashtag => (
              <MenuBtn sub="true" to={`/hashtag/${hashtag}`} key={hashtag}>
                <Icon width="18px" height="23px" src="/PictureSrc/IMark.png" />
                <HashtagBtn key={hashtag}>{`#${hashtag}`}</HashtagBtn>
                <PassIcon src="/PictureSrc/Pass.png" />
              </MenuBtn>
            ))
          : null}
        <DetailBox>
          <Icon width="18px" height="23px" src="/PictureSrc/IMark.png" />
          <HashtagBtn onClick={openHashtagMenu}>follow 하러 가기</HashtagBtn>
          <PassIcon src="/PictureSrc/Pass.png" />
        </DetailBox>
      </DetailContainer>
      {hashtagMenu && <HashtagMenu />}
      <MenuBtn to={routes.notYet}>
        <Icon src="/PictureSrc/ContestBtn.png" />
        <SidebarBtn>콘테스트 피드</SidebarBtn>
      </MenuBtn>
      <DetailContainer>
        {contests.map(contest => (
          <MenuBtn to={routes.notYet} key={contest}>
            <Icon
              width="18px"
              height="23px"
              left="-20px"
              src="/PictureSrc/Calender.png"
            />
            <HashtagBtn key={contest}>{contest}</HashtagBtn>
            <PassIcon src="/PictureSrc/Pass.png" />
          </MenuBtn>
        ))}
        <DetailBox>
          <Icon width="18px" height="23px" src="/PictureSrc/IMark.png" />
          <HashtagBtn onClick={openContestMenu}>더보기</HashtagBtn>
          <PassIcon src="/PictureSrc/Pass.png" />
        </DetailBox>
      </DetailContainer>
      {contestMenu ? <ContestMenu /> : null}
      <BlankSpace />
    </SidebarContainer>
  );
}

export default Sidebar;
