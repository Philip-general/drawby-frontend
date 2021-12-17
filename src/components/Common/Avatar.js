import styled from "styled-components";

export const UserIcon = styled.img`
  background-color: ${props => (props.color ? props.color : "#f1f2f3")};
  width: ${props => (props.size ? props.size : "25px")};
  height: ${props => (props.size ? props.size : "25px")};
  border-radius: 50%;
`;
// 유저 아바타 받아와서 표현해야함
export default UserIcon;
