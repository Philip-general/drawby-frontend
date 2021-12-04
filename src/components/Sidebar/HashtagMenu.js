import React from "react";
import styled from "styled-components";

//Modal은 창 사이즈를 prop으로 받아서 처리해야할 듯!
const Modal = styled.div`
  position: fixed;
  top: 20%;
  left: 25%;
  width: 50%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
`;
function HashtagMenu({ onClick }) {
  return <Modal>Hashtag</Modal>;
}

export default HashtagMenu;
