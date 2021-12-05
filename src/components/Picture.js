import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Comments from "./Comments";
import UserIcon from "./Common/Avatar";
import Username from "./Common/Username";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const PictureContainer = styled.div`
  max-width: 680px;
  border-radius: 8px;
  margin: 40px 0 30px;
  background-color: #fff;
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.06);
`;

const PictureHeader = styled.div`
  justify-content: space-between;
  height: 72px;
  padding: 14px 0;
  margin: 0 16px;
`;

const UserContainer = styled.div`
  justify-content: left;
  align-items: center;
  display: flex;
`;

const PictureTitle = styled.div``;

const PictureImage = styled.img`
  width: 680px;
  height: 680px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
`;

const IconAction = styled.div``;

const Icon = styled.img`
  width: 24px;
  max-height: 24px;
  margin-left: 5px;
  opacity: ${props => (props.color === "red" ? "1" : "0.3")};
  filter: opacity(0.5) drop-shadow(0 0 0 ${props => props.color});
  color: ${props => props.color};
`;

const TotalLike = styled.div`
  height: 21px;
  margin: 12px;
`;

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
        <Link to={`/profile/${author.username}`}>
          <UserContainer>
            <UserIcon size="46px" />
            <Username>{author.username}</Username>
          </UserContainer>
        </Link>
        <PictureTitle>그림 제목: {name}</PictureTitle>
      </PictureHeader>
      <PictureImage src={file} />
      <IconContainer>
        <LeftContainer>
          <IconAction onClick={toggleLike2Picture}>
            <Icon
              src="/PictureSrc/LikeBtn.png"
              color={isLiked ? "red" : "white"}
            />
          </IconAction>
          <IconAction onClick={focusCommentInput}>
            <Icon src="/PictureSrc/Comment.png" />
          </IconAction>
          <Icon src="/PictureSrc/DM.png" />
        </LeftContainer>
        <IconAction onClick={toggleBookmark}>
          <Icon />
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
