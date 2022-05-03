import styled from "styled-components";

// Styled component pour la navbar 
export const NavBarS = styled.nav`
  background : Linear-gradient(60deg, rgb(28,27,27) 0%, rgb(26,23,23) 100%);
  display: flex;
  flex-direction : row;
  align-items : center;
  height: 3.9em;
  gap: 20%;
`;

export const NavLogoContainer = styled.div`
  display: flex
  justify-content: center;
  height: 85%;
  width: auto;  
  margin: 5px;
  margin-bottom: 8px;
`;

export const NavLogo = styled.img`
  display: flex;
  height: 100%;
  width: auto;
`;

// Styled component pour la searchbar
export const SearchBarContainer = styled.div`
  diplay: flex; 
  justify-self: center;
  border: 1px solid #55ACEE;
  border-radius: 100vh;
  height: 2.6em;
  width: 70em;
`;
export const SearchBarInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 100vh;
  height: 100%;
  width: 100%;
`;

export const SearchBarForm = styled.form`
  display: flex;
  flex-direction: row;
  border-radius: 100vh;
  height: 100%;
  width: 100%;
`;

export const SearBarInput = styled.input`
  diplay: flex;  
  border: 1px solid #55ACEE;
  border-radius: 100vh 0vh 0vh 100vh;
  height: 100%;
  width: 100%;
  padding: 0.2em 0.8em;
`;

export const SearchBarButton = styled.button`
  diplay: flex;  
  justify-content: center;
  align-items:center;
  border: 1px solid #55ACEE;
  border-radius: 0vh 100vh 100vh 0vh;
  color: rgb(255,255,255);
  background-color: #55ACEE;
  height: 100%;
  width: 20%;
  cursor: pointer;
`;
// Styled component pour le Dropdown du Twitterlogger
export const Main = styled("div")`
  background: #55ACEE;
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
  display: flex;
  justify-content: center;
  position: absolute;
  margin-top: 3px;
  z-index: 100;
  width: auto;
  height: auto;
`;

export const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  background: #55ACEE;
  border-radius: 0vh 0vh 1vh 1vh;
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.2em;
  }
`;

export const ListItem = styled("div")`
  list-style: none;
  color: rgb(255,255,255);
  text-align: flex-start;
  margin-left: 5px;
  margin-bottom: 5px;
  &:hover {
    color: #fd9e46;

  }
`;

//Style component pour les élements du twitterlogger
export const TwitterLoggerSignInImg = styled.img`
  cursor: pointer;
`;

export const TwitterLoggerUserImg = styled.img`
  height: auto;
  width: auto;
  borer-radius : 100vh;
`;

export const TwitterLoggerLogOutButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TwitterLoggerLogOutButton = styled.button`
  dispaly: flex;
  cursor: pointer; 
  background: none;
  color: rgb(255,255,255);
  border: 1px solid rgb(255,255,255);
  border-radius : 100vh;
  margin-bottom: 5px;
  &:hover {
    color: #fd9e46;
    border-color: #fd9e46;

  }
`;