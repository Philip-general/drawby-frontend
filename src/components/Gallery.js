import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: flex;
  width: 650px;
`;

const SmallPicture = styled.div`
  background-image: url(${props => props.bg});
  background-size: cover;
  position: relative;
  min-width: 213.3px;
  min-height: 213.3px;
  margin: 0 20px 15px 0;
  border-radius: 8px;
`;

function Gallery({ pictures }) {
  return (
    <Grid>
      {pictures?.map(picture => (
        <SmallPicture key={picture.id} bg={picture.file} />
      ))}
    </Grid>
  );
}

export default Gallery;
