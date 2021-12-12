import { gql, useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import { useParams } from "react-router";
import Picture from "../components/Picture";

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
      {data?.seeHashtagPictures?.map(picture => (
        <Picture key={picture.id} {...picture} />
      ))}
    </Fragment>
  );
}

export default HashtagFeed;
