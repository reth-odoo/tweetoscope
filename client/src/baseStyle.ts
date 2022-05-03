import styled from "styled-components";

const BaseContainer = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: 1fr 12fr;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    "nav nav"
    "wgl tl";
  grid-gap: 0.15rem;
`;

const NavContainer = styled.div`
  grid-area: nav;
  overflow: hidden;
`;

const TlContainer = styled.div`
  background: #252626;
  grid-area: tl;
  overflow: hidden;
`;

const WglContainer = styled.div`
  background: #292f33;
  color: white;
  grid-area: wgl;
  overflow: hidden;
  text-align: center;
`;

export { BaseContainer, NavContainer, TlContainer, WglContainer };
