import styled from "styled-components";

export const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-auto-rows: ${props => (props.small ? "158.8px" : "213.3px")};
  grid-template-columns: ${props =>
    props.small ? "repeat(4, 1fr)" : "repeat(3, 1fr)"};
  gap: 10px;
`;

export const SmallPicture = styled.div`
  cursor: pointer;
  background-image: url(${props => props.bg});
  background-size: cover;
  width: ${props => (props.small ? props.small : "213.3px")};
  height: ${props => (props.small ? props.small : "213.3px")};
  border-radius: 8px;
`;

export const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.small ? props.small : "213.3px")};
  height: ${props => (props.small ? props.small : "213.3px")};
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
