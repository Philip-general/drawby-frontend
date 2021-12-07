import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { FontSpan } from "./Common/Commons";
import PropTypes from "prop-types";
import { Grid, SmallPicture, Icons, Icon } from "./Common/GridPictures";

function Gallery({ pictures }) {
  return (
    <Grid>
      {pictures?.map(picture => (
        <SmallPicture key={picture.id} bg={picture.file}>
          <Icons>
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
      ))}
    </Grid>
  );
}

Gallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      caption: PropTypes.string,
      file: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      totalLike: PropTypes.number.isRequired,
      totalComment: PropTypes.number.isRequired
    })
  )
};

export default Gallery;
