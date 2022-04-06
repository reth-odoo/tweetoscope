import styled from "styled-components";

export const NavBarS = styled.nav`
    background : Linear-gradient(60deg, rgb(28,27,27) 0%, rgb(26,23,23) 100%);
    display: flex;
    flex-direction : row;
    align-items : center;
    height: 3.5em;
    gap: 5%;
    position: relative;
`;

export const NavLogo = styled.img`
    justify-self : flex-start;
    margin : 0.60em;
    height: 100%;
    width: auto;
`;

export const SearBarS = styled.input`
    justify-self: center;
    border: 1px;
    height: 2em;
    width: 70em;
`;

export const DdWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const DdHeader = styled.div`
    display: flex;
    justify-content: center; 
    cursor: pointer;
    background-color: rgb(3,169,244);
    height: 1.7em;
    align-items: center;
    width: 10em;
    margin: 0.60em;
    position: fix;
`;

export const TitleS = styled.p`
    justify-content: center;
    color: rgb(255,255,255);
`;

export const DdList = styled.ul`
    list-style-type: none;
    display: flex
    flex-direction: column ;
`;

export const DdButton = styled.button`
    display: inline-block;
    background-color; rgb(3,169,244);
    padding: 15px 20px 15px 20px;
    border: 0;
    border-bottom: 1px;
    text-align: center;
    border-left: 1px;
    border-right: 1px;
    cursor: poinnter;
`;

export const DdListItem = styled.li`
    display: flex;
    flex-direction: column;
    background-color: rgb(3,169,244);
    color: rgb(255,255,255);
    border: 1px solid;
    border-color: rgb(0,0,0);
`;