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
        createdAt
        author {
          username
          avatar
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
