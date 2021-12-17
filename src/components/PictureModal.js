import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { ModalBackground } from "./Common/Modal";
import { FontSpan, NoLineLink } from "./Common/Commons";
import UserIcon from "./Common/Avatar";
import { UserInfo } from "./Comment";
import Username from "./Common/Username";
import { Hashtag, Hashtags, PictureTitle } from "./Picture";
import ResizeText from "./ResizeText";
import { useNavigate } from "react-router-dom";

const ModalBox = styled.div`
  display: inline-block;
  max-width: 1000px;
  margin: 40px 30px 100px;
  height: auto;
  flex: 1;
  display: flex;
  /* align-items: center; */
  padding: 30px 0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 3px 30px 0 rgba(0, 0, 0, 0.06);
  outline: none;
`;

const Left = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 700px;
  background-color: black;
  margin-right: 30px;
`;

const PictureImg = styled.img`
  max-width: 700px;
  max-height: 500px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  width: 300px;
  gap: 10px;
`;

const SEE_PICTURE_QUERY = gql`
  query seePicture($id: Int!) {
    seePicture(id: $id) {
      author {
        username
        avatar
      }
      caption
      comments {
        id
        author {
          username
          avatar
        }
        payload
        isMine
        isLiked
        nestedComments {
          id
          author {
            username
            avatar
          }
          payload
          isMine
          isLiked
        }
      }
      file
      id
      isLiked
      isMine
      isBookmarked
      name
      totalComment
      totalLike
      hashtags {
        id
        hashtagName
      }
    }
  }
`;

function PictureModal({ id, setShowBigPicture }) {
  const { data, loading } = useQuery(SEE_PICTURE_QUERY, { variables: { id } });
  const navigate = useNavigate();
  const onClickBackground = e => {
    if (e.target === e.currentTarget) {
      setShowBigPicture(false);
    }
  };
  const onClickHashtag = hashtagName => {
    setShowBigPicture(false);
    navigate(`/hashtag/${hashtagName.slice(1)}/search`);
  };
  return (
    <ModalBackground black="true" onClick={e => onClickBackground(e)}>
      <ModalBox>
        <Left>
          {loading ? (
            <FontSpan>그림 로딩 중</FontSpan>
          ) : (
            <PictureImg src={data?.seePicture?.file} />
          )}
        </Left>
        {data && data.seePicture && (
          <Right>
            <NoLineLink
              onClick={() => setShowBigPicture(false)}
              to={`/profile/${data.seePicture.author.username}`}
            >
              <UserInfo>
                <UserIcon size="40px" src={data.seePicture.author.avatar} />
                <Username>{data.seePicture.author.username}</Username>
              </UserInfo>
            </NoLineLink>
            <PictureTitle>{data.seePicture.name}</PictureTitle>
            <ResizeText caption={data.seePicture.caption} size={45} />
            <Hashtags>
              {data.seePicture.hashtags.map(hashtag => (
                <Hashtag
                  onClick={() => onClickHashtag(hashtag.hashtagName)}
                  key={hashtag.id}
                >
                  {hashtag.hashtagName}
                </Hashtag>
              ))}
            </Hashtags>
          </Right>
        )}
      </ModalBox>
    </ModalBackground>
  );
}

export default PictureModal;
