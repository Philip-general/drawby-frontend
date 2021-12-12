import { gql, useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { FontSpan } from "../components/Common/Commons";
import Picture from "../components/Picture";

const HashtagTitle = styled(FontSpan)`
  margin: 30px 0 16px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.44;
  color: #333;
`;

const SEE_HASHTAG_PICTURES = gql`
  query seeHashtagPictures($hashtagName: String!) {
    seeHashtagPictures(hashtagName: $hashtagName) {
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

function HashtagFeed() {
  const { hashtagName } = useParams();
  const { data } = useQuery(SEE_HASHTAG_PICTURES, {
    variables: { hashtagName: "#" + hashtagName }
  });
  return (
    <Fragment>
      <HashtagTitle>#{hashtagName}</HashtagTitle>
      {data?.seeHashtagPictures?.map(picture => (
        <Picture key={picture.id} {...picture} />
      ))}
    </Fragment>
  );
}

export default HashtagFeed;
