import React, { useState } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import axios from 'axios';
import { styled } from 'styled-components';

function CommentPage() {
  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '행복한 날', content: 'one' },
    { name: '화나는 날', content: 'two' },
    { name: '우울한 날', content: 'three' },
    { name: '즐거운 날', content: 'four' }
  ];

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };
  return (
    <>
      <BackgroundImage />
      <CommentCotainer>
        <CommentWrap>
          <CommentTab>
            <div>
              <TabMenu>
                {/* <li className="submenu">{menuArr[0].name}</li>
          <li className="submenu">{menuArr[1].name}</li>
          <li className="submenu">{menuArr[2].name}</li> */}
                {menuArr.map((el, index) => (
                  <li
                    className={index === currentTab ? 'submenu focused' : 'submenu'}
                    onClick={() => selectMenuHandler(index)}
                  >
                    {el.name}
                  </li>
                ))}
              </TabMenu>
              <Desc>
                {/* <p>{menuArr[currentTab].content}</p> */}
                {
                  <CommentBox>
                    <Comments>
                      <CommentInfo>
                        <p>초밥</p>
                        <p>맛있어요!</p>
                      </CommentInfo>
                      <Buttons>
                        <button>수정</button>
                        <button>삭제</button>
                      </Buttons>
                    </Comments>
                    <div>
                      <div>
                        <h4>음식명</h4>
                        <input type="text" placeholder="내용을 입력해 주세요."></input>
                      </div>
                      <div>
                        <h4>비밀번호</h4>
                        <input type="password" placeholder="내용을 입력해 주세요."></input>
                      </div>
                      <div>
                        <h4>후기</h4>
                        <input type="text" placeholder="내용을 입력해 주세요."></input>
                      </div>
                      <button>등록하기</button>
                    </div>
                  </CommentBox>
                }
              </Desc>
            </div>
          </CommentTab>
        </CommentWrap>
      </CommentCotainer>
    </>
  );
}

export default CommentPage;

const CommentCotainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8rem;
`;
const CommentWrap = styled.div`
  background-color: #fff;
  width: 50rem;
  height: 43.75rem;
`;
const CommentTab = styled.div``;

// Styled-Component 라이브러리를 활용해 TabMenu 와 Desc 컴포넌트의 CSS를 구현.

const TabMenu = styled.ul`
  background-color: #dcdcdc;
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 7rem;
  margin-top: 10px;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    /* justify-content: space-between;
    width: 380px;
    heigth: 30px; */
    width: calc(100% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255, 255, 255);
    color: rgb(21, 20, 20);
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  text-align: center;
`;

const CommentBox = styled.div``;

const Comments = styled.div``;

const CommentInfo = styled.div``;

const Buttons = styled.div``;
