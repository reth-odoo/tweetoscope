import styled from "styled-components";

export const NavBarS = styled.nav`
  background : Linear-gradient(60deg, rgb(28,27,27) 0%, rgb(26,23,23) 100%);
  display: flex;
  flex-direction : row;
  align-items : center;
  height: 3.5em;
  gap: 20%;
`;

export const NavLogo = styled.img`
  display: flex;
  justify-self : flex-start;
  margin : 0.60em;
  height: 85%;
  width: auto;
`;

export const SearBarS = styled.input`
  diplay: flex;  
  justify-self: center;
  border: 1px solid rgb(0,67,134);
  border-radius: 100vh;
  height: 2.6em;
  width: 70em;
`;

export const Main = styled("div")`
  background: rgb(0,67,134);
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.6em;
  border-radius: 100vh;
`;

export const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

export const DropDownHeader = styled("div")`
  margin-bottom: 0.01em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: rgb(255,255,255);
  border: 1px solid;
  border-radius: 100vh;
  height: 0.6em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #fd9e46;
  }
`;

export const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 100;
  width: 10.5em;
`;

export const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  background: none;
  border-radius: 1em;
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.2em;
  }
`;

export const ListItem = styled("li")`
  list-style: none;
  border: 1px solid rgb(0,0,0);
  color: rgb(255,255,255);
  background-color: rgb(0,67,134);
  margin-bottom: 0.1em;
  cursor: pointer;
  border-radius: 1em;
  &:hover {
    color: #fd9e46;
    border: 1px solid #fd9e46;

  }
`;