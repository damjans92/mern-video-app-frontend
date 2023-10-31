import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
         0%   {transform: rotate(0deg)}
        100%   {transform: rotate(360deg)}
`

const prixClipFix = keyframes`
       0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
          50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
          75%, 100%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
`

const Loader = styled.span`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 1s linear infinite;
  margin: 0 auto;
  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #fff;
    animation: ${prixClipFix} 2s linear infinite;
  }
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #fff;
    animation: ${prixClipFix} 2s linear infinite;
  }
  &::after {
    transform: rotate3d(90, 90, 0, 180deg);
    border-color: #ff3d00;
  }
  @media screen and (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`

const Spinner = () => {
  return <Loader></Loader>
}

export default Spinner
