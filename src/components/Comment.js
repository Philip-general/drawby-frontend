import styled from "styled-components";
import { PropTypes } from "prop-types";
import UserIcon from "./Common/Avatar";
import Username from "./Common/Username";
import { gql, useMutation } from "@apollo/client";

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

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

export default function Comment({ id, pictureId, payload, author, isMine }) {
  const deleteCommentUpdate = (cache, result) => {
    const {
      data: {
        deleteComment: { ok, error }
      }
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Picture:${pictureId}`,
        fields: {
          totalComment(prev) {
            return prev - 1;
          }
        }
      });
    }
  };
  const [deleteCommentMutation, { loading }] = useMutation(
    DELETE_COMMENT_MUTATION,
    {
      variables: { id },
      update: deleteCommentUpdate
    }
  );
  return (
    <CommentBox>
      <UserInfo>
        <UserIcon color="orange" />
        <Username>{author.username}</Username>
      </UserInfo>
      <Payload>{payload}</Payload>
      {isMine ? (
        <DeleteBtn onClick={deleteCommentMutation}>삭제버튼</DeleteBtn>
      ) : null}
    </CommentBox>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  payload: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }),
  pictureId: PropTypes.number.isRequired,
  isMine: PropTypes.bool.isRequired
};
