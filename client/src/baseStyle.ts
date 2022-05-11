import styled from "styled-components";

const BaseContainer = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: 1fr 12fr;
  grid-template-areas:
    "nav"
    "main";
`;

const MainContainer = styled.div`
  background: #252626;
  grid-area: main;
  overflow: hidden;
  position: relative;
`;

const NavContainer = styled.div`
  background: #00acee;
  color: white;
  overflow: hidden;
`;

const EditorButton = styled.button`
  background-color: #66757d;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: 20px;
  margin: 15px;
  transition-duration: 0.5s;


  &:hover {
    background-color: #55acee;
    cursor: pointer;
  }
`;

export { BaseContainer, MainContainer, NavContainer, EditorButton };
