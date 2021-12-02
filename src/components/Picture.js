import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Comments from "./Comments";
import UserIcon from "./Common/Avatar";
import Username from "./Common/Username";
import { gql, useMutation } from "@apollo/client";

const PictureContainer = styled.div`
  max-width: 800px;
`;

const PictureHeader = styled.div``;

const UserContainer = styled.div`
  justify-content: left;
  display: flex;
`;

const PictureTitle = styled.div``;

const PictureImage = styled.img`
  max-width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
`;

const IconAction = styled.div``;

const Icon = styled.div`
  margin-left: 5px;
`;

const TotalLike = styled.div``;

const Caption = styled.div``;

const TOGGLE_LIKE_2_PICTURE_MUTATION = gql`
  mutation toggleLike2Picture($id: Int!) {
    toggleLike2Picture(id: $id) {
      ok
      error
    }
  }
`;

const TOGGLE_BOOKMARK = gql`
  mutation toggleBookmark($pictureId: Int!) {
    toggleBookmark(pictureId: $pictureId) {
      ok
      error
    }
  }
`;

export default function Picture({
  author,
  caption,
  comments,
  file,
  id,
  isLiked,
  isMine,
  isBookmarked,
  name,
  totalComment,
  totalLike
}) {
  const focusCommentInputRef = useRef(null);
  const focusCommentInput = () => {
    focusCommentInputRef.current.focusCommentInput();
  };

  let okLike = isLiked;
  const toggleLike2PictureUpdate = (cache, result) => {
    const {
      data: {
        toggleLike2Picture: { ok }
      }
    } = result;
    if (ok) {
      cache.modify({
        id: `Picture:${id}`,
        fields: {
          isLiked(prev) {
            okLike = !okLike;
            return !prev;
          },
          totalLike(prev) {
            if (okLike) {
              return prev - 1;
            }
            return prev + 1;
          }
        }
      });
    }
  };
  const [toggleLike2Picture] = useMutation(TOGGLE_LIKE_2_PICTURE_MUTATION, {
    variables: { id },
    update: toggleLike2PictureUpdate
  });
  const toggleBookmarkUpdate = (cache, result) => {
    const {
      data: {
        toggleBookmark: { ok }
      }
    } = result;
    if (ok) {
      cache.modify({
        id: `Picture:${id}`,
        fields: {
          isBookmarked(prev) {
            return !prev;
          }
        }
      });
    }
  };
  const [toggleBookmark] = useMutation(TOGGLE_BOOKMARK, {
    variables: { pictureId: id },
    update: toggleBookmarkUpdate
  });
  return (
    <PictureContainer>
      <PictureHeader>
        <UserContainer>
          <UserIcon />
          <Username>{author.username} (유저이름)</Username>
        </UserContainer>
        <PictureTitle>그림 제목: {name}</PictureTitle>
      </PictureHeader>
      <PictureImage src={file} />
      <IconContainer>
        <LeftContainer>
          <IconAction onClick={toggleLike2Picture}>
            <Icon>{isLiked ? "하트" : "X하트X"}</Icon>
          </IconAction>
          <IconAction onClick={focusCommentInput}>
            <Icon>댓글</Icon>
          </IconAction>
          <Icon>DM</Icon>
        </LeftContainer>
        <IconAction onClick={toggleBookmark}>
          <Icon>{isBookmarked ? "북마크✅" : "북마크❌"}</Icon>
        </IconAction>
      </IconContainer>
      <TotalLike>좋아요 개수: {totalLike}</TotalLike>
      <Caption>{caption}</Caption>
      <Comments
        pictureId={id}
        comments={comments}
        totalComment={totalComment}
        ref={focusCommentInputRef}
      />
    </PictureContainer>
  );
}

Picture.propTypes = {
  author: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }),
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isMine: PropTypes.bool.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  totalComment: PropTypes.number.isRequired,
  totalLike: PropTypes.number.isRequired
};
