import React, { useState } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { prevPage, nextPage } from '../redux/modules/questPage';
import { statusModal } from '../redux/modules/isOpen';
import { getEmotions } from '../redux/modules/emotions';
import { newnewChecked } from '../redux/modules/checked';
function SurveyPage() {
  const dispatch = useDispatch();
  const { checked } = useSelector((state) => state.checked);
  const { emotions } = useSelector((state) => state.emotions);
  const { isOpen } = useSelector((state) => state.isOpen);
  const { questPage } = useSelector((state) => state.questPage);
  const navigate = useNavigate();
  const modeEmotion = (emotions) => {
    let modeArr = new Map();
    for (let n of emotions) modeArr.set(n, (modeArr.get(n) || 0) + 1);
    modeArr = [...modeArr].sort((a, b) => b[1] - a[1]);
    return modeArr[0][0];
  };
  const { data, isLoading, isError, error } = useQuery('surveys', async () => {
    const response = await axios.get('${process.env.REACT_APP_MOODFOOD}/surveys');
    return response.data;
  });
  if (isLoading) {
    return <>로딩중입니다...</>;
  }
  if (isError) {
    return <>에러입니다...</>;
  }
  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    dispatch(statusModal(true));
  };
  const closeModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    dispatch(statusModal(false));
  };
  return (
    <>
      <BackgroundImage />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh'
        }}
      >
        <NextButton onClick={() => dispatch(prevPage(1))} visibility={questPage !== 0} position="left">
          <FontAwesomeIcon icon={faAnglesLeft} />
        </NextButton>
        <div
          style={{
            border: '3px solid none',
            background: '#FFFFFF',
            width: '500px',
            height: '480px',
            padding: '0px 20px',
            borderRadius: '8px'
          }}
        >
          <form id="Q1">
            <h2 style={{ textAlign: 'center', margin: '60px 0 50px 0' }}>
              Q{questPage + 1}.&nbsp;{data[questPage].quest}
            </h2>
            <div style={{ textAlign: 'center' }}>
              {data[questPage].answers.map((item, index) => {
                return (
                  <div
                    style={{
                      margin: '30px',
                      fontWeight: 700,
                      fontSize: '20px'
                    }}
                  >
                    <div style={{ textAlign: 'start', padding: '0 40px' }}>
                      <input
                        type="radio"
                        id="q1"
                        name="q1"
                        value={item.emotion}
                        checked={index === checked[questPage]} // checked를 -1로 채워진 배열로 초기값 설정
                        onChange={(e) => {
                          if (e.target.checked) {
                            // checked = [3, -1, -1, -1]; <- 퀘스천 4개일 때 1번째 퀘스천 4번째 라디오 버튼 선택 시
                            // checked = [3, 1, -1, -1]; <- 2번째 퀘스천 2번째 라디오 버튼 선택 시
                            // 1번 퀘스천 선택시 checked의 0번 인덱스의 값을 변경
                            // questPage: 0
                            // 2번 퀘스천 선택시 checked의 1번 인덱스의 값을 변경
                            // questPage: 1
                            // map 새로운 배열을 반환하기 때문에 ... 안써도 됨
                            const newChecked = checked.map((checkItem, checkIndex) => {
                              if (questPage === checkIndex) return index; // 퀘스천 순서 일치시 radio index 값 리턴
                              return checkItem; // checked의 인덱스에 해당하는 값 리턴
                            });
                            dispatch(newnewChecked(newChecked));
                            const newEmotions = [...emotions, e.target.value];
                            dispatch(getEmotions(newEmotions));
                          }
                          // active 주황색, border : gray
                        }}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
                      &nbsp;
                      <label
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        {item.answer}
                      </label>
                    </div>
                  </div>
                );
              })}
              <ResultButton
                onClick={(e) => {
                  e.preventDefault();
                  if (checked[questPage] === -1) {
                    openModalHandler();
                  } else {
                    const pickedEmotion = modeEmotion(emotions); // 최빈값을 구한 감정의 대한 결과
                    dispatch(getEmotions(pickedEmotion));
                    return navigate('/result');
                  }
                }}
                visibility={questPage + 1 === data.length}
              >
                결과 보기
              </ResultButton>
            </div>
          </form>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <NextButton
            onClick={() => {
              if (checked[questPage] === -1) {
                openModalHandler();
              } else {
                dispatch(nextPage(1));
              }
            }}
            visibility={questPage < data.length - 1}
            position="right"
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </NextButton>
        </div>
        {isOpen ? (
          <div
            style={{
              zIndex: '1',
              position: 'fixed',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '10px',
              top: 0,
              left: '0',
              right: '0',
              bottom: '0'
            }}
            onClick={openModalHandler}
          >
            {/* 버블링 현상 제거 */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                width: '200px',
                height: '100px',
                borderRadius: '8px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  color: '#000000',
                  display: 'flex',
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  marginTop: '20px',
                  fontWeight: '700'
                }}
              >
                항목을 선택해주세요!!
              </div>
              <button
                style={{
                  border: '3px solid #FFE4C2',
                  background: 'transparent',
                  borderRadius: '8px',
                  color: '#FF800B',
                  fontSize: '15px',
                  fontWeight: '700',
                  marginTop: '20px',
                  marginLeft: '70px'
                }}
                onClick={closeModalHandler}
              >
                닫기
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
export default SurveyPage;
const NextButton = styled.button`
  visibility: ${(props) => (props.visibility ? 'visible' : 'hidden')};
  cursor: pointer;
  background: transparent;
  color: #ffffff;
  transform: scale(2);
  ${(props) => (props.position === 'left' ? 'margin-right:10px;' : 'margin-left:10px;')}
  border: 3px solid transparent;
`;
const ResultButton = styled.button`
  visibility: ${(props) => (props.visibility ? 'visible' : 'hidden')};
  background: #ffffff;
  color: #ff800b;
  width: 70px;
  height: 30px;
  font-weight: 700;
  border: 3px solid #ffe4c2;
  cursor: pointer;
  border-radius: 20px;
  margin-top: 30px;
`;
