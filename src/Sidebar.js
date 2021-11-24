import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "./routes";

const SidebarContainer = styled.div`
  width: 300px;
  background-color: #292929;
  margin-right: 10px;
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

function Sidebar() {
  const hashtags = ["bicycle", "tree", "movie"];
  const contests = ["11월 첫째주", "11월 둘째주", "11월 셋째주"];
  return (
    <SidebarContainer>
      <Link to={routes.home}>
        <SidebarBtn>Go to Home</SidebarBtn>
      </Link>
      <Link to={routes.notYet}>
        <SidebarBtn>Go to LikeFeed</SidebarBtn>
      </Link>
      {hashtags ? (
        hashtags.map(hashtag => (
          <Link to={routes.notYet}>
            <HashtagBtn>{hashtag}</HashtagBtn>
          </Link>
        ))
      ) : (
        <HashtagBtn>follow 하러 가기</HashtagBtn>
      )}
      <Link to={routes.notYet}>
        <SidebarBtn>Go to ContestFeed</SidebarBtn>
      </Link>
      {contests.map(contest => (
        <Link to={routes.notYet}>
          <HashtagBtn>{contest}</HashtagBtn>
        </Link>
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;
