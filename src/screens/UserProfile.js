import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import UserIcon from "../components/Common/Avatar";
import Username from "../components/Common/Username";
import useUser from "../hooks/useUser";
import Gallery from "../components/Gallery";

const SUserProfile = styled.div`
  display: flex;
`;

const UserInfo = styled.div``;

const FollowIcon = styled.div``;

const Bio = styled.div``;

const FollowContainer = styled.div`
  display: flex;
`;

const Follower = styled.div``;

const Following = styled.div``;

const UserPictureContainer = styled.div``;

const GalleryBtns = styled.div``;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      email
      avatar
      bio
      pictures {
        id
        caption
        file
        name
        totalLike
      }
      isMe
      totalFollowers
      totalFollowings
      isFollowing
    }
  }
`;

function UserProfile() {
  const usernameMingo = "dabin";
  const { data: userData } = useUser();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: usernameMingo
    }
  });

  const [gallery, setGallery] = useState(0);
  const changeGallery = e => {
    setGallery(e);
  };
  return (
    <Fragment>
      <SUserProfile>
        <UserIcon />
        <UserInfo>
          <Username>{data?.seeProfile?.username}</Username>
          <Bio>bio</Bio>
          <FollowContainer>
            <Follower>팔로워 {data?.seeProfile?.totalFollowers}</Follower>
            <Following>팔로잉 {data?.seeProfile?.totalFollowings} </Following>
          </FollowContainer>
        </UserInfo>
        <FollowIcon>{data?.seeProfile?.isMe ? "나다" : "아니다"}</FollowIcon>
      </SUserProfile>
      <UserPictureContainer>
        <GalleryBtns>
          <button onClick={() => changeGallery(0)}>개인 갤러리</button>
          <button onClick={() => changeGallery(1)}>콘테스트 작품</button>
          <button onClick={() => changeGallery(2)}>북마크한 작품</button>
        </GalleryBtns>
        {data && gallery === 0 ? (
          <Gallery pictures={data?.seeProfile?.pictures} />
        ) : null}
      </UserPictureContainer>
    </Fragment>
  );
}

export default UserProfile;
