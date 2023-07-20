import React from 'react';
import BackgroundImage from '../components/BackgroundImage';
import { styled } from 'styled-components';

function ResultPage() {
  return (
    <>
      <BackgroundImage />
      <OuterBox>
        <InnerBox>
          <QmoodFood>당신의 MoodFood는?</QmoodFood>
          <ImgGroup>
            <ImgDiv1></ImgDiv1>
            <ImgDiv2></ImgDiv2>
            <ImgDiv3></ImgDiv3>
          </ImgGroup>
          <FoodGroup>
            <FoodText1>치킨</FoodText1>
            <FoodText2>치킨</FoodText2>
            <FoodText3>치킨</FoodText3>
          </FoodGroup>
          <Explanation>
            마음속에 행복이 넘쳐나는 당신!!! <br />
            추천드린 음식을 주변사람들과 드시고
            <br /> 당신의 행복을 널리널리 전파해 주세요~!!!!
          </Explanation>
          {/* <span>만나기만 해도 즐거운 사람들과 함께 이 음식을 먹으면서 좋은 추억 간직하는 하루 보내시길 바랍니당~</span>
<span>슬프고 힘든 당신에게 이 음식들을 통해 위로가 되고 힘이 되었으면 좋겠습니다!!</span>
<span>음~ 몸속에 화가 많이 쌓이셨군요!!! 추천드린 음식을 드시고 앞으로는 홧속 기쁨만 넘쳐나는 하루하루 보내시길 바랍니다~?!?!?!?!</span> */}

          <AllButtonGroup>
            <ButtonGroup>
              <ShardButton>공유하기</ShardButton>
              <ReplyButton>다시하기</ReplyButton>
            </ButtonGroup>
            <AndSoOnButton>다른 MoodFood보기</AndSoOnButton>
          </AllButtonGroup>
          <HrBox />
          <div>
            <h2>상세 MoodFood</h2>
          </div>
        </InnerBox>
      </OuterBox>
    </>
  );
}

export default ResultPage;

const QmoodFood = styled.h1`
  font-size: 26px;
  padding: 20px;
  text-align: center;
`;

const OuterBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerBox = styled.div`
  width: 800px;
  height: 700px;
  background-color: #ffffff;
  overflow-y: scroll;
`;
// 음식 img
const ImgGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ImgDiv1 = styled.div`
  width: 200px;
  height: 200px;
  background-color: gray;
`;
const ImgDiv2 = styled.div`
  width: 200px;
  height: 200px;
  background-color: gray;
`;
const ImgDiv3 = styled.div`
  width: 200px;
  height: 200px;
  background-color: gray;
`;
// img food 표기
const FoodGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;
const FoodText1 = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
`;
const FoodText2 = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
`;
const FoodText3 = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
`;

// 간단한 안내문구
const Explanation = styled.span`
  font-size: 15px;
  font-weight: 700;
  margin-top: 15px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const AllButtonGroup = styled.div`
  text-align: center;
  margin-top: 30px;
`;
const ButtonGroup = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ShardButton = styled.button`
  background-color: #ff800b;
  color: #ffffff;
  font-weight: 700;
  border: transparent;
  margin-right: 10px;
  width: 80px;
  height: 30px;
  border-radius: 8px;
`;
const ReplyButton = styled.button`
  background-color: #ff800b;
  color: #ffffff;
  font-weight: 700;
  border: transparent;
  width: 80px;
  height: 30px;
  border-radius: 8px;
`;
const AndSoOnButton = styled.button`
  background-color: #ff800b;
  color: #ffffff;
  font-weight: 700;
  border: transparent;
  width: 170px;
  height: 40px;
  border-radius: 8px;
`;

const HrBox = styled.div`
  width: 90%;
  border: 1px solid #fba85bbd;
  text-align: center;
  margin-left: 30px;
  margin-top: 20px;
`;
