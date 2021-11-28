import React from "react";
import UserIcon from "./Common/Avatar";
import PropTypes from "prop-types";
import styled from "styled-components";
import Username from "./Common/Username";
import { Payload, UserInfo } from "./Comment";

const NestedCommentContainer = styled.div`
  display: flex;
  margin-left: 150px;
  margin-bottom: 10px;
`;

function NestedComments({ id, payload, isMine, author }) {
  return (
    <NestedCommentContainer>
      <UserInfo>
        <UserIcon color="tomato" />
        <Username>{author.username}</Username>
      </UserInfo>
      <Payload>{payload}</Payload>
    </NestedCommentContainer>
  );
}

NestedComments.propTypes = {
  id: PropTypes.number.isRequired,
  payload: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
  author: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  })
};

export default NestedComments;
