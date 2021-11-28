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
import useUser from "../hooks/useUser";

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

export const DeleteBtn = styled.button``;

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
  commentId,
  pictureId,
  payload,
  author,
  isMine,
  nestedComments
}) {
  const { data: userData } = useUser();
  // 대댓글 보여주기 토글
  const [showNestedComments, setShowNestedComments] = useState(false);
  const toggleShowNestedComments = () => {
    setShowNestedComments(!showNestedComments);
    showNestedComments ? setShowCommentBox(false) : setShowCommentBox(true);
  };

  // 댓글 삭제 캐시 업데이트
  const deleteCommentUpdate = (cache, result) => {
    const {
      data: {
        deleteComment: { ok }
      }
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${commentId}` });
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

  // 댓글 삭제 뮤테이션
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { id: commentId },
    update: deleteCommentUpdate
  });
  const [showCommentBox, setShowCommentBox] = useState(false);
  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  // 대댓글 생성 캐시 업데이트
  const createNestedCommentUpdate = (cache, result) => {
    const payload = getValues("payload");
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id }
      }
    } = result;
    if (ok && userData?.me) {
      const newNestedComment = {
        __typename: "NestedComment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        author: { ...userData.me }
      };
      const newCacheNestedComment = cache.writeFragment({
        data: newNestedComment,
        fragment: gql`
          fragment nestedComment on NestedComment {
            id
            createdAt
            isMine
            payload
            author {
              username
              avatar
            }
          }
        `
      });
      cache.modify({
        id: `Comment:${commentId}`,
        fields: {
          nestedComments(prev) {
            return [...prev, newCacheNestedComment];
          }
        }
      });
    }
  };
  // 대댓글 생성 뮤테이션
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [createNestedCommentMutation, { loading: createLoading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createNestedCommentUpdate
    }
  );
  const onValid = data => {
    const { payload } = data;
    if (createLoading) {
      return;
    }
    createNestedCommentMutation({
      variables: {
        payload,
        pictureId,
        commentId
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
          <DeleteBtn onClick={deleteCommentMutation}>댓글삭제</DeleteBtn>
        ) : null}
      </CommentContainer>
      {showNestedComments
        ? nestedComments
          ? nestedComments.map(nestedComment => (
              <NestedComments
                key={nestedComment.id}
                commentId={commentId}
                {...nestedComment}
              />
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
  commentId: PropTypes.number.isRequired,
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
