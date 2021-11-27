import styled from "styled-components";

export const UserIcon = styled.div`
  background-color: ${props => (props.color ? props.color : "blue")};
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;
// 유저 아바타 받아와서 표현해야함
export default UserIcon;
