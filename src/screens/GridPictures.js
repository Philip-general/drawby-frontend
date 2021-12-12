import React, { Fragment } from "react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import {
  Grid,
  Icon,
  Icons,
  SmallPicture
} from "../components/Common/GridPictures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontSpan } from "../components/Common/Commons";
import styled from "styled-components";

const HashtagName = styled(FontSpan)`
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
      totalLike
      totalComment
    }
  }
`;

function GridPictures({ noTitle }) {
  const { hashtagName } = useParams();
  const { data } = useQuery(SEE_HASHTAG_PICTURES, {
    variables: { hashtagName: `#${hashtagName}` }
  });
  return (
    <Fragment>
      {!noTitle && <HashtagName>{`#${hashtagName}`}</HashtagName>}
      <Grid small>
        {data
          ? data?.seeHashtagPictures.map(picture => (
              <SmallPicture key={picture.id} small bg={picture.file}>
                <Icons small>
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
