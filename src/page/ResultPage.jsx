import React, { useRef, useState } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getEmotions, resetEmotions } from '../redux/modules/emotions';
import { useEffect } from 'react';
import { getComments } from '../redux/modules/comments';
import { resetPage } from '../redux/modules/questPage';
import { resetChecked } from '../redux/modules/checked';
import Loading from '../components/Loading';

function ResultPage() {
  const [isLoading, setIsLoading] = useState('');
  const { emotions } = useSelector((state) => state.emotions);
  const { comments } = useSelector((state) => state.comments);
  const [resultEmotion, setResultEmotion] = useState('');
  const [comment, setComment] = useState('');
  const [foodImg, setFoodImg] = useState([]);
  const navigate = useNavigate();
  const topSwitch = useRef();
  const moveToTop = () => {
    topSwitch.current.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const dispatch = useDispatch();

  // 데이터 조회
  const {
    data: surveysData,
    isLoading: surveyLoding,
    isError: surveysIsError,
    error: surveyError
  } = useQuery('surveys', async () => {
    const response = await axios.get(`${process.env.REACT_APP_MOODFOOD}/surveys`);
    return response.data;
  });

  const {
    data: foodImagesData,
    isLoading: foodImgLoding,
    isError: foodImgIsError,
    error: foodImgError
  } = useQuery('foodimage', async () => {
    const response = await axios.get(`${process.env.REACT_APP_MOODFOOD}/foodimage`);
    return response.data;
  });

  if (surveyLoding || foodImgLoding) {
    return <Loading />;
  }

  if (surveysIsError || foodImgIsError) {
    return <>에러입니다</>;
  }

  const match = foodImagesData?.find((item) => item.mood === emotions);
  const randomNum = Math.floor(Math.random() * 4 + 1);

  return (
    <>
      <BackgroundImage />
      <OuterBox>
        <InnerBox ref={topSwitch}>
          <QmoodFood>당신의 MoodFood는?</QmoodFood>
          <ImgGroup>
            {match.food.splice(randomNum, 3).map((item) => {
              return (
                <InfomationDiv>
                  <ImgArea src={item.url} />
                  <FoodName>{item.foodname}</FoodName>
                </InfomationDiv>
              );
            })}
            <Explanation>{comments}</Explanation>
          </ImgGroup>

          <AllButtonGroup>
            <ButtonGroup>
              <ShardButton
                onClick={() => {
                  navigate('/comment');
                }}
              >
                댓글 작성
              </ShardButton>
              <ReplyButton
                onClick={() => {
                  navigate('/survey');
                  dispatch(resetEmotions());
                  dispatch(resetPage());
                  dispatch(resetChecked());
                }}
              >
                다시하기
              </ReplyButton>
            </ButtonGroup>
            <AndSoOnButton
              onClick={() => {
                navigate('/detail');
              }}
            >
              MoodFood 더보기
            </AndSoOnButton>
          </AllButtonGroup>
          <HrBox />
          <DetailFood>다른 MoodFood</DetailFood>
          <ImgGroupDetail>
            {match.food.splice(randomNum, 3).map((item) => {
              return (
                <InfomationDetail>
                  <ImgAreaDetail src={item.url} />
                  <div style={{ display: 'flex', flexDirection: 'row', height: '250px', marginTop: '20px' }}>
                    <div style={{ border: '2px solid lightgray', margin: '0 10px' }} />
                  </div>
                  <Foods>
                    <FoodNameDetail>{item.foodname}</FoodNameDetail>
                    <FoodContentDetail>{item.comment}</FoodContentDetail>
                  </Foods>
                </InfomationDetail>
              );
            })}
          </ImgGroupDetail>
          <ScrollToUp className="material-symbols-outlined" onClick={moveToTop}>
            assistant_navigation
          </ScrollToUp>
        </InnerBox>
      </OuterBox>
    </>
  );
}

export default ResultPage;

const ScrollToUp = styled.span`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

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
  position: relative;
`;
// 음식 img
const ImgGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const InfomationDiv = styled.div`
  border-bottom: 2px solid lightgray;
`;

const ImgArea = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 8px;
`;
// img food 표기
const FoodName = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 15px;
  margin-bottom: 5px;
  text-align: center;
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
  border: 2px solid #fba85bbd;
  text-align: center;
  margin-left: 30px;
  margin-top: 20px;
`;

const DetailFood = styled.h2`
  text-align: center;
`;

const ImgGroupDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const InfomationDetail = styled.div`
  display: flex;
`;
const ImgAreaDetail = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 8px;
  margin-top: 20px;
  border-right: 10px;
  padding-bottom: 10px;
`;
// img food 표기

const Foods = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  margin-bottom: 20px;
`;

const FoodNameDetail = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FoodContentDetail = styled.div``;
