import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import UserIcon from "../components/Common/Avatar";
import useUser from "../hooks/useUser";
import Gallery from "../components/Gallery";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { FontSpan } from "../components/Common/Commons";
import InfiniteScroll from "react-infinite-scroll-component";

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
  height: 21px;
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
  query seeProfile(
    $username: String!
    $skip: Int!
    $take: Int!
    $contestSkip: Int!
    $contestTake: Int!
  ) {
    seeProfile(username: $username) {
      id
      username
      email
      avatar
      bio
      pictures(skip: $skip, take: $take) {
        id
        caption
        file
        name
        totalLike
        totalComment
      }
      contestPictures(contestSkip: $contestSkip, contestTake: $contestTake) {
        id
        caption
        file
        name
        totalLike
        totalComment
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
  const { username } = useParams();
  const { data: userData } = useUser();
  const navigate = useNavigate();
  const { data, loading, fetchMore } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
      skip: 0,
      take: 12,
      contestSkip: 0,
      contestTake: 12
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
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowings(prev) {
          return prev + 1;
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
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowings(prev) {
          return prev - 1;
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
      navigate(`/profile/${username}/edit`);
    } else if (data?.seeProfile?.isFollowing) {
      unfollowUserMutation({
        variables: { username }
      });
    } else {
      followUserMutation({
        variables: { username }
      });
    }
  };

  const [gallery, setGallery] = useState(0);

  const onLoadMorePictures = () => {
    fetchMore({
      variables: {
        username,
        skip: data.seeProfile.pictures.length,
        take: 12,
        contestSkip: 0,
        contestTake: 0
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seeProfile: {
            id: prev.seeProfile.id,
            username: prev.seeProfile.username,
            email: prev.seeProfile.email,
            avatar: prev.seeProfile.avatar,
            bio: prev.seeProfile.bio,
            contestPictures: prev.seeProfile.contestPictures,
            isMe: prev.seeProfile.isMe,
            totalFollowers: prev.seeProfile.totalFollowers,
            totalFollowings: prev.seeProfile.totalFollowings,
            isFollowing: prev.seeProfile.isFollowing,
            pictures: [
              ...prev.seeProfile.pictures,
              ...fetchMoreResult.seeProfile.pictures
            ]
          }
        });
      }
    });
  };

  const onLoadMoreContestPictures = () => {
    fetchMore({
      variables: {
        skip: 0,
        take: 0,
        contestSkip: data.seeProfile.contestPictures.length,
        contestTake: 12
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seeProfile: {
            id: prev.seeProfile.id,
            username: prev.seeProfile.username,
            email: prev.seeProfile.email,
            avatar: prev.seeProfile.avatar,
            bio: prev.seeProfile.bio,
            pictures: prev.seeProfile.pictures,
            isMe: prev.seeProfile.isMe,
            totalFollowers: prev.seeProfile.totalFollowers,
            totalFollowings: prev.seeProfile.totalFollowings,
            isFollowing: prev.seeProfile.isFollowing,
            contestPictures: [
              ...prev.seeProfile.contestPictures,
              ...fetchMoreResult.seeProfile.contestPictures
            ]
          }
        });
      }
    });
  };
  return (
    <Fragment>
      <SUserProfile>
        <UserContainer>
          <UserIcon size="140px" src={data?.seeProfile?.avatar} />
          <UserInfo>
            <Username>{username}</Username>
            {data?.seeProfile?.bio ? (
              <Bio>{data?.seeProfile?.bio}</Bio>
            ) : (
              <Bio />
            )}
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
        {!loading && data && data.seeProfile && gallery === 0 && (
          <InfiniteScroll
            dataLength={data.seeProfile.pictures.length}
            next={onLoadMorePictures}
            hasMore={true}
          >
            <Gallery pictures={data?.seeProfile?.pictures} />
          </InfiniteScroll>
        )}
        {!loading && data && data.seeProfile && gallery === 1 && (
          <InfiniteScroll
            dataLength={data.seeProfile.contestPictures.length}
            next={onLoadMoreContestPictures}
            hasMore={true}
          >
            <Gallery pictures={data?.seeProfile?.contestPictures} />
          </InfiniteScroll>
        )}
      </UserPictureContainer>
    </Fragment>
  );
}

export default UserProfile;
