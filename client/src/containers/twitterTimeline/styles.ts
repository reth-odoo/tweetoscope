import React from "react";
import styled, { keyframes } from "styled-components";

export const Container = styled.div<{offsets: {x:number, y:number}}>`
position: relative;
width: 100%;
height: 100%;
overflow: hidden;
transition: margin-left .5s;
> div {transform: translate(${props => props.offsets.x}px,${props=>props.offsets.y}px);}
path {transform: translate(${props => props.offsets.x}px,${props=>props.offsets.y}px);}
`;

export const SVGContainer = styled.svg`
position: absolute;
top:0;
left:0;
width:100%;
height:100%;
`;
