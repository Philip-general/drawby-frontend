import { gql, useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import ContestHeader from "../components/ContestHeader";
import PageTitle from "../components/PageTitle";
import Picture from "../components/Picture";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
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
      totalComment
      totalLike
      isMine
      isLiked
    }
  }
`;

export default function Home() {
  const { data } = useQuery(FEED_QUERY);
  return (
    <Fragment>
      <ContestHeader />
      <PageTitle title="home" />
      {data?.seeFeed?.map(picture => (
        <Picture key={picture.id} {...picture} />
      ))}
    </Fragment>
  );
}
