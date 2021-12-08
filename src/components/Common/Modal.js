import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${props =>
    props.black === "true" ? "rgba(0, 0, 0, 0.5) " : null};
`;
