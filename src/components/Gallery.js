import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { FontSpan } from "./Common/Commons";
import PropTypes from "prop-types";
import { Grid, SmallPicture, Icons, Icon } from "./Common/GridPictures";
import PictureModal from "./PictureModal";

function Gallery({ pictures }) {
  const [showBigPicture, setShowBigPicture] = useState();
  const [bigPictureId, setBigPictureId] = useState();
  const onClickSmallPicture = id => {
    setShowBigPicture(true);
    setBigPictureId(id);
  };
  return (
    <Grid>
      {pictures?.map(picture => (
        <SmallPicture
          onClick={() => onClickSmallPicture(picture.id)}
          key={picture.id}
          bg={picture.file}
        >
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
      {showBigPicture && (
        <PictureModal id={bigPictureId} setShowBigPicture={setShowBigPicture} />
      )}
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
