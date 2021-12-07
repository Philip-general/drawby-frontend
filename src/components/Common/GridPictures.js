import styled from "styled-components";

export const Grid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-auto-rows: 228.3px;
  grid-template-columns: ${props =>
    props.small ? "repeat(4, 1fr)" : "repeat(3, 1fr)"};
  gap: 20px;
`;

export const SmallPicture = styled.div`
  background-image: url(${props => props.bg});
  background-size: cover;
  width: ${props => (props.small ? "155.8px" : "213.3px")};
  height: ${props => (props.small ? "155.8px" : "213.3px")};
  border-radius: 8px;
`;

export const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.small ? "155.8px" : "213.3px")};
  height: ${props => (props.small ? "155.8px" : "213.3px")};
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

export const Icon = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;
