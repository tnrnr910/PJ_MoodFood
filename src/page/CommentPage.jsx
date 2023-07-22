import React, { useState } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import axios from 'axios';
import { styled } from 'styled-components';
import { nanoid } from 'nanoid';
import { QueryClient, useMutation, useQueryClient, useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { statusModal } from '../redux/modules/isOpen';

function CommentPage() {
  const queryClient = new useQueryClient();
  // state
  const [food, setFood] = useState('');
  const [comments, setComments] = useState('');
  const [pwd, setPwd] = useState('');
  const [checkPwd, setCheckPwd] = useState('');
  const [isUpdate, setIsUpdate] = useState('');
  const [newFood, setNewFood] = useState('');
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  // 모달
  const { isOpen } = useSelector((state) => state.isOpen);
  // pwd 모달 열기(수정/삭제)버튼
  const openModalHandler = () => {
    dispatch(statusModal(true));
  };
  // pwd 모달 닫기 버튼

  const closeModalHandler = () => {
    dispatch(statusModal(false));
  };
  // pwd 모달 완료버튼
  const completeModalHandler = (e) => {
    e.preventDefault();
    if (!isUpdate) {
      if (checkPwd === data.password) {
        console.log(data.password);
        console.log(checkPwd);
        mutationDelete.mutate(data.id);
        closeModalHandler();
        setCheckPwd('');
      } else {
        alert('비밀번호가 틀립니다.');
        setCheckPwd('');
      }
    }
    if (isUpdate) {
      if (checkPwd === data.password) {
        const newComments = {
          id: data.id,
          pwd: data.password,
          title: newFood,
          review: newComment
        };
        mutationUpdate.mutate(newComments);
        closeModalHandler();
        setCheckPwd('');
      } else {
        alert('비밀번호가 틀립니다.');
        setCheckPwd('');
      }
    }
  };
  //useQuery
  const { data, isLoading, isError, error } = useQuery('users', async () => {
    const response = await axios.get('http://localhost:4000/users');
    console.log('데이터', data);
    return response.data;
  });
  if (isLoading) {
    <>로딩중입니다...</>;
  }
  if (isError) {
    <>{error.message}</>;
  }
  const addComments = async (contents) => {
    await axios.post('http://localhost:4000/users', contents);
  };
  const mutationAdd = useMutation(addComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });
  // 삭제 query function
  const deleteComments = async (id) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
  };
  const mutationDelete = useMutation(deleteComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });
  // 수정 query function
  const updateComments = async (contents) => {
    await axios.put(`http://localhost:4000/users/${contents.id}`, contents);
    console.log('contents', contents);
  };
  const mutationUpdate = useMutation(updateComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });
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
                {
                  <CommentBox>
                    <FormBox>
                      <div>
                        <span>음식명</span>
                        <input
                          type="text"
                          value={food}
                          onChange={(e) => setFood(e.target.value)}
                          placeholder="내용을 입력해 주세요."
                        ></input>
                      </div>
                      &nbsp;
                      <div>
                        <span>후기</span>
                        <input
                          type="text"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          placeholder="내용을 입력해 주세요."
                        ></input>
                      </div>
                      &nbsp;
                      <div>
                        <span>비밀번호</span>
                        <input
                          type="password"
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
                          placeholder="내용을 입력해 주세요."
                        ></input>
                      </div>
                      &nbsp;
                      <button
                        onClick={() => {
                          const newComments = { id: nanoid(), password: pwd, title: food, review: comments };
                          mutationAdd.mutate(newComments);
                        }}
                      >
                        등록하기
                      </button>
                    </FormBox>
                    <Comments>
                      <CommentInfo>
                        <ReviewBox>
                          {data?.map((item) => {
                            return (
                              <>
                                <div key={item.pwd}>
                                  <div>
                                    <p>{item.title}</p>
                                    <p>{item.review}</p>
                                  </div>
                                  <Buttons>
                                    <button
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => {
                                        openModalHandler();
                                        setIsUpdate(true);
                                      }}
                                    >
                                      수정
                                    </button>

                                    <button
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => {
                                        openModalHandler();
                                        setIsUpdate(false);
                                      }}
                                    >
                                      삭제
                                    </button>
                                  </Buttons>
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
                                      {!isUpdate ? (
                                        <>
                                          <div
                                            style={{
                                              backgroundColor: '#ffffff',
                                              width: '300px',
                                              height: '150px',
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
                                                fontSize: '16px',
                                                marginTop: '50px',
                                                fontWeight: '700'
                                              }}
                                            >
                                              <span>비밀번호 : &nbsp;</span>
                                              <input
                                                type="password"
                                                value={checkPwd}
                                                onChange={(e) => setCheckPwd(e.target.value)}
                                              ></input>
                                            </div>
                                            <button
                                              style={{
                                                border: '3px solid #FFE4C2',
                                                background: 'transparent',
                                                borderRadius: '8px',
                                                color: '#ff800b',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                cursor: 'pointer'
                                              }}
                                              onClick={completeModalHandler}
                                            >
                                              완료
                                            </button>
                                            <button
                                              style={{
                                                border: '3px solid #FFE4C2',
                                                background: 'transparent',
                                                borderRadius: '8px',
                                                color: '#ff800b',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                                marginLeft: '10px'
                                              }}
                                              onClick={closeModalHandler}
                                            >
                                              닫기
                                            </button>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              backgroundColor: '#ffffff',
                                              width: '300px',
                                              height: '200px',
                                              borderRadius: '8px'
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <form>
                                              <span>음식 : &nbsp;</span>
                                              <input
                                                type="text"
                                                value={newFood}
                                                onChange={(e) => setNewFood(e.target.value)}
                                              ></input>
                                              <br />
                                              <span>후기 : &nbsp;</span>
                                              <input
                                                type="text"
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                              ></input>
                                              <br />
                                              <span>비밀번호 : &nbsp;</span>
                                              <input
                                                type="password"
                                                value={checkPwd}
                                                onChange={(e) => setCheckPwd(e.target.value)}
                                              ></input>
                                            </form>
                                            <button
                                              style={{
                                                border: '3px solid #FFE4C2',
                                                background: 'transparent',
                                                borderRadius: '8px',
                                                color: '#ff800b',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                cursor: 'pointer'
                                              }}
                                              onClick={completeModalHandler}
                                            >
                                              완료
                                            </button>
                                            <button
                                              style={{
                                                border: '3px solid #FFE4C2',
                                                background: 'transparent',
                                                borderRadius: '8px',
                                                color: '#ff800b',
                                                fontSize: '15px',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                                marginLeft: '10px'
                                              }}
                                              onClick={closeModalHandler}
                                            >
                                              닫기
                                            </button>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                              </>
                            );
                          })}
                        </ReviewBox>
                      </CommentInfo>
                    </Comments>
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
const FormBox = styled.div`
  display: flex;
`;
const ReviewBox = styled.div`
  width: 700px;
  height: 400px;
  background-color: pink;
`;
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
