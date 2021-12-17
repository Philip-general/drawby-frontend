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
import { FontSpan, NoLineLink } from "./Common/Commons";
import ResizeText from "./ResizeText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faLineHeart } from "@fortawesome/free-regular-svg-icons";

const CommentContainer = styled.div`
  display: flex;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  min-width: 80px;
`;

export const Payload = styled.div`
  margin-bottom: 15px;
  width: 70%;
  margin-left: 50px;
`;

const CommentSpread = styled(FontSpan)`
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
  font-weight: regular;
  color: #999;
  text-align: right;
  width: 100px;
`;

export const HeartIcon = styled.div`
  cursor: pointer;
  margin-top: 3px;
  margin-right: 3px;
  :active {
    filter: brightness(70%);
  }
`;

export const DeleteBtn = styled(FontSpan)`
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
  font-weight: regular;
  color: tomato;
  text-align: right;
  width: 35px;
`;

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

const TOGGLE_LIKE_2_COMMENT_MUTATION = gql`
  mutation toggleLike2Comment($id: Int!) {
    toggleLike2Comment(id: $id) {
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
  isLiked,
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
  //댓글 좋아요 토글 캐시 업데이트
  const toggleLike2CommentUpdatae = (cache, result) => {
    const {
      data: {
        toggleLike2Comment: { ok }
      }
    } = result;
    if (ok) {
      cache.modify({
        id: `Comment:${commentId}`,
        fields: {
          isLiked(prev) {
            return !prev;
          }
        }
      });
    }
  };
  //댓글 좋아요 토글 뮤테이션
  const [toggleLike2CommentMutation] = useMutation(
    TOGGLE_LIKE_2_COMMENT_MUTATION,
    {
      variables: {
        id: commentId
      },
      update: toggleLike2CommentUpdatae
    }
  );

  return (
    <Fragment>
      <CommentContainer>
        <NoLineLink to={`/profile/${author.username}`}>
          <UserInfo>
            <UserIcon src={author.avatar} />
            <Username>{author.username}</Username>
          </UserInfo>
        </NoLineLink>
        <Payload>
          <ResizeText caption={payload} fontColor={"#797979"} />
        </Payload>
        <CommentSpread onClick={toggleShowNestedComments}>
          {showNestedComments ? "댓글숨기기" : "댓글보기"}
        </CommentSpread>
        <HeartIcon onClick={toggleLike2CommentMutation}>
          {isLiked ? (
            <FontAwesomeIcon icon={faHeart} color="#ff2b57" />
          ) : (
            <FontAwesomeIcon icon={faLineHeart} color="#ccc" />
          )}
        </HeartIcon>
        {isMine && <DeleteBtn onClick={deleteCommentMutation}>삭제</DeleteBtn>}
      </CommentContainer>
      {showNestedComments &&
        nestedComments &&
        nestedComments.map(nestedComment => (
          <NestedComments
            key={nestedComment.id}
            commentId={commentId}
            {...nestedComment}
          />
        ))}

      {showCommentBox ? (
        <form onSubmit={handleSubmit(onValid)}>
          <CommentBox
            autoComplete="off"
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
  isMine: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired
};
