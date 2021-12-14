import React, { Fragment } from "react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { Grid, Icon, Icons, SmallPicture } from "./Common/GridPictures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontSpan } from "./Common/Commons";
import styled from "styled-components";

const HashtagName = styled(FontSpan)`
  margin: 30px 0 16px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.44;
  color: #333;
`;

const SEE_HASHTAG = gql`
  query seeHashtag($hashtagName: String!) {
    seeHashtag(hashtagName: $hashtagName) {
      id
      hashtagName
      isFollowing
      pictures {
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
  }
`;

function GridPictures({ noTitle }) {
  const { hashtagName } = useParams();
  const contestArr = hashtagName.split(" ");
  const contestName =
    "#" + contestArr[0] + "_" + contestArr[1] + "_" + contestArr[2];
  const { data } = useQuery(SEE_HASHTAG, {
    variables: { hashtagName: contestName }
  });
  return (
    <Fragment>
      {!noTitle && <HashtagName>{`#${hashtagName}`}</HashtagName>}
      <Grid small>
        {data
          ? data?.seeHashtag?.pictures.map(picture => (
              <SmallPicture key={picture.id} small="158.8px" bg={picture.file}>
                <Icons small="158.8px">
                  <Icon>
                    <FontAwesomeIcon icon={faHeart} color="#ff2b57" />
                    <FontSpan>{picture.totalLike}</FontSpan>
                  </Icon>
                  <Icon>
                    <FontAwesomeIcon icon={faComment} />
                    <FontSpan>{picture.totalComment}</FontSpan>
                  </Icon>
                </Icons>
              </SmallPicture>
            ))
          : null}
      </Grid>
    </Fragment>
  );
}

export default GridPictures;
