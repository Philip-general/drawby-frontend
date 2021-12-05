import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import UserIcon from "../components/Common/Avatar";
import useUser from "../hooks/useUser";
import Gallery from "../components/Gallery";
import { useNavigate, useParams } from "react-router";
import routes from "../routes";
import { FontSpan } from "../components/Common/Commons";

const SUserProfile = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
`;

const UserContainer = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  margin-left: 60px;
`;

const Username = styled(FontSpan)`
  margin-bottom: 20px;
  padding-top: 14px;
  font-size: 28px;
  line-height: 0.64;
  letter-spacing: normal;
  justify-content: center;
  text-align: left;
  color: #333;
`;

const FollowBox = styled.div`
  display: flex;
  height: 28px;
  padding: 4px 10px;
  border-radius: 17px;
  background-color: #ecf1f6;
`;

const FollowBtn = styled(FontSpan)`
  margin: 4px 10px;
  height: 28px;
  font-size: 14px;
  line-height: 1.29;
  color: #999;
  line-height: 1.29;
`;

const Bio = styled(FontSpan)`
  margin-bottom: 12px;
  font-size: 15px;
  line-height: 1.2;
  color: #797979;
`;

const FollowContainer = styled.div`
  display: flex;
`;

const FollowText = styled(FontSpan)`
  font-size: 14px;
  line-height: 1.29;
  color: #333;
  margin-right: 30px;
`;

const UserPictureContainer = styled.div``;

const Line = styled.div`
  width: 680px;
  height: 2px;
  margin: 40px 0 14px;
  background-color: #eee;
`;

const GalleryBtns = styled.div`
  display: flex;
  gap: 70px;
  justify-content: center;
`;

const GalleryBtn = styled.div`
  display: flex;
`;

const OnLine = styled.div`
  width: 100px;
  height: 2px;
  position: relative;
  bottom: 16px;
  background-color: ${props => props.color};
`;

const GalleryIcon = styled.img`
  /* width: 16px; */
  height: 16px;
`;

const GalleryText = styled(FontSpan)`
  color: ${props => (props.color ? props.color : "#ccc")};
  margin-left: 6px;
  font-size: 14px;
  line-height: 1.29;
`;

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
const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`;

function UserProfile() {
  const navigate = useNavigate();
  const { username } = useParams();

  // username을 동적으로 받아와서 변경가능하게끔 해야함!
  const { data: userData } = useUser();

  // 로그인이 안되어있다면 홈으로 이동
  if (!userData) {
    navigate(routes.home);
  }
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username
    }
  });

  const followUserUpdate = (cache, result) => {
    const {
      data: {
        followUser: { ok }
      }
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        totalFollowers(prev) {
          return prev + 1;
        },
        isFollowing(prev) {
          return !prev;
        }
      }
    });
  };
  const [followUserMutation, { loading: followLoading, data: followData }] =
    useMutation(FOLLOW_USER_MUTATION, {
      update: followUserUpdate
    });

  const unfollowUserUpdate = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok }
      }
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        totalFollowers(prev) {
          return prev - 1;
        },
        isFollowing(prev) {
          return !prev;
        }
      }
    });
  };
  const [
    unfollowUserMutation,
    { loading: unfollowLoading, data: unfollowData }
  ] = useMutation(UNFOLLOW_USER_MUTATION, {
    update: unfollowUserUpdate
  });

  const followEditClick = () => {
    if (data?.seeProfile?.isMe) {
      console.log("Profile Edit");
    } else if (data?.seeProfile?.isFollowing) {
      unfollowUserMutation({
        variables: { username }
      });
      console.log("unfollow button");
    } else {
      followUserMutation({
        variables: { username }
      });
      console.log("follow button");
    }
  };

  const [gallery, setGallery] = useState(0);
  return (
    <Fragment>
      <SUserProfile>
        <UserContainer>
          <UserIcon size="140px" />
          <UserInfo>
            <Username>{username}</Username>
            <Bio>{data?.seeProfile?.bio}</Bio>
            <FollowContainer>
              <FollowText>팔로워 {data?.seeProfile?.totalFollowers}</FollowText>
              <FollowText>
                팔로잉 {data?.seeProfile?.totalFollowings}
              </FollowText>
            </FollowContainer>
          </UserInfo>
        </UserContainer>
        <FollowBox>
          <FollowBtn onClick={() => followEditClick()}>
            {data?.seeProfile?.isMe
              ? "Edit Profile"
              : data?.seeProfile?.isFollowing
              ? "Unfollow"
              : "Follow"}
          </FollowBtn>
        </FollowBox>
      </SUserProfile>
      <UserPictureContainer>
        <Line />
        <GalleryBtns>
          <div onClick={() => setGallery(0)}>
            {gallery === 0 ? (
              <>
                <OnLine color="#0e3870" />
                <GalleryBtn>
                  <GalleryIcon src="/PictureSrc/UserGalleryOn.png" />
                  <GalleryText color="#0e3870">개인 갤러리</GalleryText>
                </GalleryBtn>
              </>
            ) : (
              <>
                <OnLine color="#eee" />
                <GalleryBtn>
                  <GalleryIcon src="/PictureSrc/UserGalleryOff.png" />
                  <GalleryText>개인 갤러리</GalleryText>
                </GalleryBtn>
              </>
            )}
          </div>
          <div onClick={() => setGallery(1)}>
            {gallery === 1 ? (
              <>
                <OnLine color="#0e3870" />
                <GalleryBtn>
                  <GalleryIcon src="/PictureSrc/ContestGalleryOn.png" />
                  <GalleryText color="#0e3870">콘테스트 작품</GalleryText>
                </GalleryBtn>
              </>
            ) : (
              <>
                <OnLine color="#eee" />
                <GalleryBtn>
                  <GalleryIcon src="/PictureSrc/ContestGalleryOff.png" />
                  <GalleryText>콘테스트 작품</GalleryText>
                </GalleryBtn>
              </>
            )}
          </div>
          <div onClick={() => setGallery(2)}>
            {gallery === 2 ? (
              <>
                <OnLine color="#0e3870" />
                <GalleryBtn>
                  <GalleryIcon src="/PictureSrc/BookmarkOn.png" />
                  <GalleryText color="#0e3870">북마크한 작품</GalleryText>
                </GalleryBtn>
              </>
            ) : (
              <>
                <OnLine color="#eee" />
                <GalleryBtn>
                  <GalleryIcon src="/PictureSrc/BookmarkOff.png" />
                  <GalleryText>북마크한 작품</GalleryText>
                </GalleryBtn>
              </>
            )}
          </div>
        </GalleryBtns>
        {data && gallery === 0 ? (
          <Gallery pictures={data?.seeProfile?.pictures} />
        ) : null}
      </UserPictureContainer>
    </Fragment>
  );
}

export default UserProfile;
