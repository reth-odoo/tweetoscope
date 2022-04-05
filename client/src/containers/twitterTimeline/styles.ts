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


const Arrow = styled.span<{hidden: boolean}>`
width: 20px; 
height: 20px; 
background: red; 
position: absolute;
top: 50%;
${props=>props.hidden?"display:hidden;":""}`;

export const RightArrow = styled(Arrow)`right: 10px`;
export const LeftArrow = styled(Arrow)`left: 10px`;