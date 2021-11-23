import styled from "styled-components";
import { PropTypes } from "prop-types";
import UserIcon from "./Common/Avatar";
import Username from "./Common/Username";
import { Fragment } from "react";

const CommentBox = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  display: flex;
  width: 15%;
  min-width: 80px;
`;

const Payload = styled.div`
  margin-left: 50px;
  width: 70%;
`;

const DeleteBtn = styled.div``;

export default function Comment({ payload, author, isMine }) {
  return (
    <CommentBox>
      <UserInfo>
        <UserIcon color="orange" />
        <Username>{author.username}</Username>
      </UserInfo>
      <Payload>{payload}</Payload>
      {isMine ? <DeleteBtn>삭제버튼</DeleteBtn> : null}
    </CommentBox>
  );
}

Comment.propTypes = {
  payload: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }),
  isMine: PropTypes.bool.isRequired
};
