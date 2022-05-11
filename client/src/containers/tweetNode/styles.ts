import styled from "styled-components";

interface TweetDivProps{
    backgroundColor: string;
    borderColor: string;
    pos: {x: number, y: number};
    dimensions: {width: number, height: number};
    selected: boolean;
}

export const TweetDiv = styled.div<TweetDivProps>`
  width: ${props => props.dimensions.width}px;
  height: ${props => props.dimensions.height}px;
  min-width: ${props => props.dimensions.width}px;
  min-height: ${props => props.dimensions.height}px;
  position: absolute;
  padding: 15px;
  background-color: ${props => props.backgroundColor};
  border: 3px solid ${props => props.borderColor};
  left: ${props => props.pos.x}px;
  top: ${props => props.pos.y}px;
  overflow: hidden;
  ${props => props.selected?"border: 3px solid #55acee":""};

  &:hover {
    overflow: visible;
    height: auto;
  }
`;

export const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
`;
