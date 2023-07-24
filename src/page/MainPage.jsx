import React from 'react';
import BackgroundImage from '../components/BackgroundImage';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

import OrangeSquareBtn from '../components/OrangeSquareBtn';
import ApricotSquareBtn from '../components/ApricotSquareBtn';

function MainPage() {
  return (
    <>
      <BackgroundImage />

      {/* 메인페이지 바디 */}
      <MainPageBody>
        {/* 메인페이지 문구들 */}
        <MainPageText>
          {/* 메인페이지 캐치프레이즈 */}
          <MainPageCatchphrase>How your Food?</MainPageCatchphrase>
          {/* 메인페이지 상세문구 */}
          <MainPageContent>
            뭘 먹어야 할지 모르는 당신!
            <br />
            <span>현재의 감정에 딱! 맞는 음식</span>을 추천해 드립니다.
            <br />
            아래의 <span>설문하기</span> 버튼을 클릭해 참여해 보세요!
          </MainPageContent>
        </MainPageText>

        {/* 메인페이지 버튼들 */}
        <MainPageButtons>
          {/* 메인페이지 주황버튼 : 클릭 시 설문조사 페이지로 이동 */}
          <Link to="/survey">
            <OrangeSquareBtn>설문하기</OrangeSquareBtn>
          </Link>
          {/* 메인페이지 살구버튼 : 클릭 시 추천음식 페이지로 이동 */}
          <Link to="/detail">
            <ApricotSquareBtn>추천 음식</ApricotSquareBtn>
          </Link>
        </MainPageButtons>
      </MainPageBody>
    </>
  );
}

export default MainPage;

const MainPageBody = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainPageText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  color: #fff;
`;

const MainPageCatchphrase = styled.h1`
  margin-bottom: 30px;
`;

const MainPageContent = styled.p`
  text-align: center;
  line-height: 150%;

  & > span {
    font-weight: 800;
  }
`;

const MainPageButtons = styled.div`
  display: flex;
  gap: 10px;
`;
