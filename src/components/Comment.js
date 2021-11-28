import styled from "styled-components";
import { PropTypes } from "prop-types";
import UserIcon from "./Common/Avatar";
import Username from "./Common/Username";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Fragment } from "react";
import { CREATE_COMMENT_MUTATION } from "./Comments";
import { useForm } from "react-hook-form";
import NestedComments from "./NestedComments";

const CommentContainer = styled.div`
  display: flex;
`;

export const UserInfo = styled.div`
  display: flex;
  width: 15%;
  min-width: 80px;
`;

export const Payload = styled.div`
  margin-left: 50px;
  width: 70%;
`;

const DeleteBtn = styled.div``;

const CommentBox = styled.input`
  margin-left: 150px;
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

export default function Comment({
  id,
  pictureId,
  payload,
  author,
  isMine,
  nestedComments
}) {
  const [showNestedComments, setShowNestedComments] = useState(false);

  const toggleShowNestedComments = () => {
    setShowNestedComments(!showNestedComments);
  };

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
  const [showCommentBox, setShowCommentBox] = useState(false);
  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [createNestedCommentMutation, { loading: createLoading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );
  const onValid = data => {
    const { payload } = data;
    setValue("payload", "");
    if (createLoading) {
      return;
    }
    createNestedCommentMutation({
      variables: {
        payload,
        pictureId,
        commentId: id
      }
    });
  };
  return (
    <Fragment>
      <CommentContainer>
        <UserInfo>
          <UserIcon color="orange" />
          <Username>{author.username}</Username>
        </UserInfo>
        <Payload>{payload}</Payload>
        <button onClick={toggleShowNestedComments}>대댓글보기</button>
        <button onClick={toggleCommentBox}>대댓글달기</button>
        {isMine ? (
          <DeleteBtn onClick={deleteCommentMutation}>삭제버튼</DeleteBtn>
        ) : null}
      </CommentContainer>
      {showNestedComments
        ? nestedComments
          ? nestedComments.map(nestedComment => (
              <NestedComments key={nestedComment.id} {...nestedComment} />
            ))
          : null
        : null}

      {showCommentBox ? (
        <form onSubmit={handleSubmit(onValid)}>
          <CommentBox
            {...register("payload", { required: true })}
            placeholder="대댓글 작성하기"
          />
        </form>
      ) : null}
    </Fragment>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  payload: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }),
  nestedComments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      author: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
      })
    })
  ),
  pictureId: PropTypes.number.isRequired,
  isMine: PropTypes.bool.isRequired
};
