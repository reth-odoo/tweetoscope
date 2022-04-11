import React from "react";
import styled, { keyframes } from "styled-components";

export const Container = styled.div<{offset: number}>`
position: relative;
width: 100%;
height: 100%;
overflow: hidden;
> div {transform: translateX(${props => props.offset}px);}
path {transform: translateX(${props => props.offset}px);}
`;

export const SVGContainer = styled.svg`
position: absolute;
top:0;
left:0;
width:100%;
height:100%;
`;
