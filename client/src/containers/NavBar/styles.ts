import styled from "styled-components";

export const NavBarS = styled.nav`
  background : Linear-gradient(60deg, rgb(28,27,27) 0%, rgb(26,23,23) 100%);
  display: flex;
  flex-direction : row;
  align-items : center;
  height: 3.5em;
  gap: 20%;
`;

export const NavLogoContainer = styled.div`
  display: flex
  justify-content: center;
  height: 85%;
  width: auto;
  margin: 5px;
  margin-bottom: 20px;
`;

export const NavLogo = styled.img`
  display: flex;
  justify-self : flex-start;
  margin : 0.60em;
  height: 85%;
  width: auto;
`;

// Styles pour la searchbar

export const SearchBarContainer = styled.div`
  diplay: flex;
  flex-direction: row;
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

export const SearBarInput = styled.input`
  diplay: flex;
  border: 1px solid #55ACEE;
  border-radius: 100vh 0vh 0vh 100vh;
  height: auto;
  width: 100%;
  padding: 0.2em 0.8em;
`;

export const SearchBarButton = styled.button`
  diplay: flex;
  align-items:center;
  border: 1px solid #55ACEE;
  border-radius: 0vh 100vh 100vh 0vh;
  color: rgb(255,255,255);
  background-color: #55ACEE;
  cursor: pointer;
  witdh : 20%;
  &:hover {
    border : 1px solid;
    color: #fd9e46;
  }
`;


// Styled component pour le Dropdown du Twitterlogger
export const Main = styled("div")`
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.6em;
  border-radius: 100vh;
`;

export const DropDownContainer = styled("div")`
  min-width: 20vh;
  max-width: 25vh;
  align-items : center;
  margin: 0 auto;
`;

export const DropDownHeader = styled("div")`
  display : flex;
  flex-direction : row;
  direction : rtl;
  justify-content : space-between;
  margin-bottom: 0.01em;
  padding: 0.4em 0.1em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  text-align : center;
  font-size : 1em;
  color: #55acee;
  border: 1px solid;
  border-radius: 100vh;
  background: #292f33;
  height: 1.6em;
  min-width : 15vh;
  width : auto;
  max-width : 25vh;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #fd9e46;
  }
`;

export const DropDownHeaderUsrNameContainer = styled.div`
  display : flex;
  align-items: center;
  margin-right : 0.5vh;
  margin-left : 0.5vh;
  width : 80%;
  height : 100%;
  word-wrap: break-word;
  &:hover&{
    height: auto;
  }
`;

export const DropDownHeaderUsrName = styled.p`

`;

export const DropDownListContainer = styled("div")`
  position: absolute;
  overflow : hidden;
  margin-top: 3px;
  margin-right : 5em;
  width : 11.7em;
  z-index: 100;
  height: auto;
`;

export const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  background: #292f33;
  border : 1px solid #55acee;
  border-radius: 0vh 0vh 1vh 1vh;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.2em;
  }
`;

export const ListItem = styled("div")`
  list-style: none;
  text-align: flex-start;
  margin-left: 0.5em;
  margin-bottom: 5px;
  &:hover {
    color: #fd9e46;
    border : 1px solid;
  }
`;

export const ListItemTitle = styled.p`
  color : #55acee;
`;

export const ListItemTexte = styled.p`
  color : #e1e8ed;
  max-width : 11.7em;
  word-wrap : break-word;
  &:hover {
    color: #fd9e46;
    height : auto;
  }
`;

//Style component pour les élements du twitterlogger qui est dans le dropdown mais comme ce sont des éléments spécifiques, ils sont à part.
export const TwitterLoggerSignInImg = styled.img`
  cursor: pointer;
`;

export const TwitterLoggerUserImgContainer = styled.div`
  display : flex;
  align-items: center;
  height : auto;
  width : auto;
  border-radius: 100vh;
`;

export const TwitterLoggerUserImg = styled.img`
  display: flex;
  object-fit : fill;
`;

export const TwitterLoggerLogOutButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TwitterLoggerLogOutButton = styled.button`
  dispaly: flex;
  cursor: pointer;
  background: none;
  color: #55acee;
  border: 1px solid rgb(255,255,255);
  border-radius : 100vh;
  margin-bottom: 5px;
  &:hover {
    color: #fd9e46;
    border-color: #fd9e46;
  }
`;
