import React from 'react';
import { styled } from 'styled-components';

import lodingImg1 from '../asset/loding_img1.png';
import lodingImg2 from '../asset/loding_img2.png';
import lodingImg3 from '../asset/loding_img3.png';
import lodingImg4 from '../asset/loding_img4.png';
import lodingImg5 from '../asset/loding_img5.png';
import lodingImg6 from '../asset/loding_img6.png';
import lodingImg7 from '../asset/loding_img7.png';
import lodingImg8 from '../asset/loding_img8.png';
import dot from '../asset/dot.png';

function Loading() {
  return (
    <LoadingImgContainer>
      <ImgLoading src={lodingImg1} alt="loadingImage" style={{ width: '100px', height: 'auto' }} />
      <ImgLoading src={lodingImg2} alt="loadingImage" style={{ width: '80px', height: 'auto' }} />
      <ImgLoading src={lodingImg3} alt="loadingImage" style={{ width: '80px', height: 'auto' }} />
      <ImgLoading src={lodingImg4} alt="loadingImage" style={{ width: '80px', height: 'auto' }} />
      <ImgLoading src={lodingImg5} alt="loadingImage" style={{ width: '75px', height: 'auto' }} />
      <ImgLoading src={lodingImg6} alt="loadingImage" style={{ width: '80px', height: 'auto' }} />
      <ImgLoading src={lodingImg7} alt="loadingImage" style={{ width: '80px', height: 'auto' }} />
      <ImgLoading src={lodingImg8} alt="loadingImage" style={{ width: '70px', height: 'auto' }} />
      <ImgLoading src={dot} alt="loadingImage" style={{ width: '30px', height: 'auto' }} />
      <ImgLoading src={dot} alt="loadingImage" style={{ width: '30px', height: 'auto' }} />
      <ImgLoading src={dot} alt="loadingImage" style={{ width: '30px', height: 'auto' }} />
    </LoadingImgContainer>
  );
}

export default Loading;

const LoadingImgContainer = styled.div`
  display: flex;
  vertical-align: bottom;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  @keyframes animation_up {
    0% {
      top: 0;
    }
    20% {
      top: -1rem;
    }
    40% {
      top: 0;
    }
    60% {
      top: 0;
    }
    80% {
      top: 0;
    }
    100% {
      top: 0;
    }
  }
`;

const ImgLoading = styled.img`
  position: relative;
  animation: animation_up 1.2s infinite;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
  &:nth-child(4) {
    animation-delay: 0.4s;
  }
  &:nth-child(5) {
    animation-delay: 0.5s;
  }
  &:nth-child(6) {
    animation-delay: 0.6s;
  }
  &:nth-child(7) {
    animation-delay: 0.7s;
  }
  &:nth-child(8) {
    animation-delay: 0.8s;
  }
  &:nth-child(9) {
    animation-delay: 0.9s;
    margin-right: 10px;
  }
  &:nth-child(10) {
    animation-delay: 1s;
    margin-right: 10px;
  }
  &:nth-child(11) {
    animation-delay: 1.1s;
    margin-right: 10px;
  }
`;
