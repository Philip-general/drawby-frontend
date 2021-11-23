import { gql, useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import styled from "styled-components";
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
  const mingoToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjM1MTQ5NjQ5fQ.tNa4jD2WwNMn0r-06xJss08FTvYpLrROi5QUArapOlw";
  localStorage.setItem("authorization", mingoToken);
  const { data } = useQuery(FEED_QUERY);
  return (
    <Fragment>
      <PageTitle title="home" />
      {data?.seeFeed?.map(picture => (
        <Picture key={picture.id} {...picture} />
      ))}
    </Fragment>
  );
}
