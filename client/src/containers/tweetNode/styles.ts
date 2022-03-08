import styled from "styled-components";

interface TweetDivProps{
    backgroundColor: string;
    borderColor: string;
    pos: {x:number, y:number};
}

export const TweetDiv = styled.div<TweetDivProps>`
max-width: 80%;
position: absolute;
padding: 10px;
background-color: ${props => props.backgroundColor};
border: 2px solid ${props => props.borderColor};
left: ${props => props.pos.x}px;
top: ${props => props.pos.y}px;
`;