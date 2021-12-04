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
const TOGGLE_LIKE_2_NESTED_COMMENT_MUTATION = gql`
  mutation toggleLike2NestedComment($id: Int!) {
    toggleLike2NestedComment(id: $id) {
      ok
      error
    }
  }
`;
function NestedComments({
  commentId,
  id,
  payload,
  isMine,
  author,
  createdAt,
  isLiked
}) {
  // 대댓글 좋아요 토글 캐시 업데이트
  const toggleLike2NestedCommentUpdate = (cache, result) => {
    const {
      data: {
        toggleLike2NestedComment: { ok }
      }
    } = result;
    if (ok) {
      cache.modify({
        id: `NestedComment:${id}`,
        fields: {
          isLiked(prev) {
            return !prev;
          }
        }
      });
    }
  };
  // 대댓글 좋아요 토글 뮤테이션
  const [toggleLike2NestedCommentMutation] = useMutation(
    TOGGLE_LIKE_2_NESTED_COMMENT_MUTATION,
    {
      variables: {
        id
      },
      update: toggleLike2NestedCommentUpdate
    }
  );
  const deleteNestedCommentUpdate = (cache, result) => {
    const {
      data: {
        deleteNestedComment: { ok }
      }
    } = result;
    if (ok) {
      cache.evict({ id: `NestedComment:${id}` });
    }
  };
  const [deleteNestedMutation] = useMutation(DELETE_NESTED_COMMENT_MUTATION, {
    variables: { id },
    update: deleteNestedCommentUpdate
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
      <div onClick={toggleLike2NestedCommentMutation}>
        {isLiked ? "💖" : "🤍"}
      </div>
    </NestedCommentContainer>
  );
}

NestedComments.propTypes = {
  commentId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  payload: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  author: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }),
  createdAt: PropTypes.string.isRequired
};

export default NestedComments;
