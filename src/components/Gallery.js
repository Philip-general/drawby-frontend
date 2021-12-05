import React from "react";
import styled from "styled-components";

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
