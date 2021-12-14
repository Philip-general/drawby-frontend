import { gql, useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import ContestHeader from "../components/ContestHeader";
import PageTitle from "../components/PageTitle";
import Picture from "../components/Picture";
import InfiniteScroll from "react-infinite-scroll-component";
const FEED_QUERY = gql`
  query seeFeed($skip: Int!, $take: Int!) {
    seeFeed(skip: $skip, take: $take) {
      id
      file
      name
      author {
        username
        avatar
      }
      caption
      comments {
        id
        payload
        isMine
        isLiked
        createdAt
        author {
          username
          avatar
        }
        nestedComments {
          id
          payload
          isMine
          createdAt
          isLiked
          author {
            avatar
            username
          }
        }
      }
      hashtags {
        id
        hashtagName
      }
      totalComment
      totalLike
      isMine
      isLiked
      isBookmarked
    }
  }
`;

export default function Home() {
  const { data, loading, fetchMore } = useQuery(FEED_QUERY, {
    variables: { skip: 0, take: 5 }
  });
  console.log(data);
  const onLoadMore = () => {
    fetchMore({
      variables: {
        skip: data.seeFeed.length,
        take: 5
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed]
        });
      }
    });
  };
  return (
    <Fragment>
      <ContestHeader />
      <PageTitle title="home" />
      {!loading && data && data.seeFeed && (
        <InfiniteScroll
          dataLength={data.seeFeed.length}
          next={onLoadMore}
          hasMore={true}
        >
          {data?.seeFeed?.map(picture => (
            <Picture key={picture.id} {...picture} />
          ))}
        </InfiniteScroll>
      )}
    </Fragment>
  );
}
