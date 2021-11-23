import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Comments from "./Comments";
import UserIcon from "./Common/Avatar";
import Username from "./Common/Username";

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

const Icon = styled.div`
  margin-left: 5px;
`;

const TotalLike = styled.div``;

export default function Picture({
  author,
  caption,
  comments,
  file,
  id,
  isLiked,
  isMine,
  name,
  totalComment,
  totalLike
}) {
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
          <Icon>하트</Icon>
          <Icon>댓글</Icon>
          <Icon>DM</Icon>
        </LeftContainer>
        <Icon>북마크</Icon>
      </IconContainer>
      <TotalLike>좋아요 개수: {totalLike}</TotalLike>
      <Comments
        pictureId={id}
        comments={comments}
        totalComment={totalComment}
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
  name: PropTypes.string.isRequired,
  totalComment: PropTypes.number.isRequired,
  totalLike: PropTypes.number.isRequired
};
