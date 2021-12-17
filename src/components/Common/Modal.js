import styled from "styled-components";

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${props =>
    props.black === "true" ? "rgba(0, 0, 0, 0.5) " : null};
`;
