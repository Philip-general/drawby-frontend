import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";

const SidebarContainer = styled.div`
  width: 300px;
  background-color: #292929;
  margin-right: 10px;
  max-height: 1000px;
`;

const SidebarBtn = styled.div`
  background-color: gray;
  margin-top: 10px;
  font-size: 30px;
  color: blue;
`;

const HashtagBtn = styled.div`
  background-color: gray;
  margin-left: 50px;
  margin-top: 10px;
`;
const Modal = styled.div`
  position: fixed;
  top: 20%;
  left: 25%;
  width: 50%;
  height: 60%;
  justify-content: center;
  align-items: center;
  background-color: gray;
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

function Sidebar() {
  // user가 follow하는 hashtag 중에 사이드바에 고정되어있는 것들
  const hashtags = ["bicycle", "tree", "movie"];
  // contest 날짜 정보를 보여주는 것
  const contests = ["11월 첫째주", "11월 둘째주", "11월 셋째주"];
  // user가 follow하는 모든 hashtag들
  const modalHashtags = ["bicycle", "tree", "movie", "squid game", "Mac", "SF"];
  const [hashtagMenu, setHashtagMenu] = useState(false);
  const [contestMenu, setContestMenu] = useState(false);
  const openHashtagMenu = () => {
    setHashtagMenu(true);
  };
  const closeHashtagMenu = () => {
    setHashtagMenu(false);
  };
  const openContestMenu = () => {
    setContestMenu(true);
  };
  const closeContestMenu = () => {
    setContestMenu(false);
  };
  function HashtagMenu() {
    return (
      <Modal>
        <ModalHeader>
          <ModalName>HashtagMenu</ModalName>
          <CloseBtn onClick={closeHashtagMenu}>X</CloseBtn>
        </ModalHeader>
        <ModalBody>
          {modalHashtags
            ? modalHashtags.map(hashtag => (
                <ModalHashtagBtn>{hashtag}</ModalHashtagBtn>
              ))
            : null}
        </ModalBody>
        <ModalFooter>
          <CloseBtn onClick={closeHashtagMenu}>Save!</CloseBtn>
        </ModalFooter>
      </Modal>
    );
  }
  function ContestMenu() {
    return (
      <Modal>
        <ModalHeader>
          <ModalName>ContestMenu</ModalName>
          <CloseBtn onClick={closeContestMenu}>X</CloseBtn>
        </ModalHeader>
        <ModalBody>여기는 달력이 들어갈 자리입니다.</ModalBody>
      </Modal>
    );
  }
  return (
    <SidebarContainer>
      <Link to={routes.home}>
        <SidebarBtn>Go to Home</SidebarBtn>
      </Link>
      <Link to={routes.notYet}>
        <SidebarBtn>Go to LikeFeed</SidebarBtn>
      </Link>
      {hashtags
        ? hashtags.map(hashtag => (
            <Link to={routes.notYet}>
              <HashtagBtn>{hashtag}</HashtagBtn>
            </Link>
          ))
        : null}
      <HashtagBtn onClick={openHashtagMenu}>follow 하러 가기</HashtagBtn>
      {hashtagMenu ? <HashtagMenu /> : null}
      <Link to={routes.notYet}>
        <SidebarBtn>Go to ContestFeed</SidebarBtn>
      </Link>
      {contests.map(contest => (
        <Link to={routes.notYet}>
          <HashtagBtn>{contest}</HashtagBtn>
        </Link>
      ))}
      <HashtagBtn onClick={openContestMenu}>더보기</HashtagBtn>
      {contestMenu ? <ContestMenu /> : null}
    </SidebarContainer>
  );
}

export default Sidebar;
