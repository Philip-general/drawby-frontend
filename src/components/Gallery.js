import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { FontSpan } from "./Common/Commons";
import PropTypes from "prop-types";

const Grid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-auto-rows: 228.3px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const SmallPicture = styled.div`
  background-image: url(${props => props.bg});
  background-size: cover;
  width: 213.3px;
  height: 213.3px;
  border-radius: 8px;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 213.3px;
  height: 213.3px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

function Gallery({ pictures }) {
  return (
    <Grid>
      {pictures?.map(picture => (
        <SmallPicture key={picture.id} bg={picture.file}>
          <Icons>
            <Icon>
              <FontAwesomeIcon icon={faHeart} color="#f65b71" />
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
