import React from "react";
import UserIcon from "./Common/Avatar";
import PropTypes from "prop-types";
import styled from "styled-components";
import Username from "./Common/Username";
import { DeleteBtn, Payload, UserInfo } from "./Comment";
import { gql, useMutation } from "@apollo/client";

const NestedCommentContainer = styled.div`
  display: flex;
  margin-left: 70px;
  margin-bottom: 10px;
`;

const DELETE_NESTED_COMMENT_MUTATION = gql`
  mutation deleteNestedComment($id: Int!) {
    deleteNestedComment(id: $id) {
      ok
      error
    }
  }
`;

function NestedComments({ id, payload, isMine, author }) {
  const [deleteNestedMutation] = useMutation(DELETE_NESTED_COMMENT_MUTATION, {
    variables: { id }
  });
  return (
    <NestedCommentContainer>
      <UserInfo>
        <UserIcon color="tomato" />
        <Username>{author.username}</Username>
      </UserInfo>
      <Payload>{payload}</Payload>
      {isMine ? (
        <DeleteBtn onClick={deleteNestedMutation}>삭제</DeleteBtn>
      ) : null}
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
