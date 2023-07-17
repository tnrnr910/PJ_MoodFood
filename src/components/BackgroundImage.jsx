import React from 'react';
import bgImg from '../asset/bgimg.jpg';
import { styled } from 'styled-components';

function BackgroundImage() {
  return (
    <>
      <Bgimg src={bgImg} />
    </>
  );
}

export default BackgroundImage;

const Bgimg = styled.img`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
  background-size: cover;
  filter: brightness(40%);
`;
