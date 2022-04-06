import styled from "styled-components";

const BaseContainer = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: 0.1fr 1fr;
  grid-template-columns: 0.1fr 1fr 0.1fr;
  grid-template-areas:
    "nav nav nav"
    "wgl tl wgr";
  grid-gap: 0.25rem;
`;

const NavContainer = styled.div`
  background: #00acee;
  color: white;
  grid-area: nav;
  overflow: hidden;
`;

const TlContainer = styled.div`
  background: #c2e7ff;
  grid-area: tl;
  overflow: hidden;
`;

const WglContainer = styled.div`
  background: #404040;
  color: white;
  grid-area: wgl;
  overflow: hidden;
`;

const WgrContainer = styled.div`
  background: #404040;
  color: white;
  grid-area: wgr;
  overflow: hidden;
`;

export { BaseContainer, NavContainer, TlContainer, WglContainer, WgrContainer };
