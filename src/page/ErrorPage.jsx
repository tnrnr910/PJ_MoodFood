import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa4 } from '@fortawesome/free-solid-svg-icons';
import ImgNotfound from '../asset/notfound_img.png';
import ApricotSquareBtn from '../components/ApricotSquareBtn';

function ErrorPage() {
  return (
    <ErrorPageBody>
      {/* 에러페이지 타이틀문구 */}
      <h1>페이지를 찾을 수 없습니다.</h1>
      {/* 에러페이지 404 이미지 */}
      <Img404>
        <FontAwesomeIcon icon={fa4} size="10x" />
        <img src={ImgNotfound} alt="404NotfoundImg" />
        <FontAwesomeIcon icon={fa4} size="10x" />
      </Img404>
      {/* 에러페이지 버튼 : 클릭 시 홈페이지로 이동 */}
      <Link to="/">
        <ApricotSquareBtn style={{ width: '200px', boxShadow: '3px 3px 5px #D3D3D3' }}>Return Home</ApricotSquareBtn>
      </Link>
    </ErrorPageBody>
  );
}

export default ErrorPage;

const ErrorPageBody = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Img404 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 20px;

  & > img {
    width: 150px;
    height: 150px;
  }
`;
