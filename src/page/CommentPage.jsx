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
  const [pickedPwd, setPickedPwd] = useState('');
  const [pickedId, setPickedId] = useState('');

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
  const completeModalHandler = () => {
    // e.preventDefault();
    if (!isUpdate) {
      if (checkPwd == pickedPwd) {
        mutationDelete.mutate(pickedId);
        closeModalHandler();
        setNewFood('');
        setNewComment('');
        setCheckPwd('');
      } else {
        alert('비밀번호가 틀립니다.');
        setNewFood('');
        setNewComment('');
        setCheckPwd('');
      }
    } else {
      if (checkPwd == pickedPwd) {
        const newComments = {
          id: pickedId,
          password: pickedPwd,
          title: newFood,
          review: newComment
        };
        mutationUpdate.mutate(newComments);
        closeModalHandler();
        setNewFood('');
        setNewComment('');
        setCheckPwd('');
      } else {
        alert('비밀번호가 틀립니다.');
        setNewFood('');
        setNewComment('');
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

  return (
    <>
      <BackgroundImage />
      <CommentCotainer>
        <CommentWrap>
          <CommentHead>나의 특별한 MoodFood</CommentHead>
          <ReviewWrap>
            <ReviewBox>
              {data?.map((item) => {
                return (
                  <>
                    <ReviewItem key={item.pwd}>
                      <ReviewText>
                        <ReviewTitle>{item.title}</ReviewTitle>
                        <p>{item.review}</p>
                      </ReviewText>
                      {/* 수정, 삭제 버튼들 */}
                      <Buttons>
                        <EditButtons
                          onClick={() => {
                            setPickedPwd(item.password);
                            setPickedId(item.id);
                            openModalHandler();
                            setIsUpdate(true);
                          }}
                        >
                          수정
                        </EditButtons>
                        <span>|</span>
                        <EditButtons
                          onClick={() => {
                            setPickedPwd(item.password);
                            setPickedId(item.id);
                            openModalHandler();
                            setIsUpdate(false);
                          }}
                        >
                          삭제
                        </EditButtons>
                      </Buttons>
                      {/* 모달 창 */}
                      {isOpen ? (
                        <ModalBox onClick={openModalHandler}>
                          {/* 버블링 현상 제거 */}
                          {!isUpdate ? (
                            <>
                              <DeleteModal onClick={(e) => e.stopPropagation()}>
                                <PasswordModal>
                                  <span>비밀번호 : &nbsp;</span>
                                  <input
                                    type="password"
                                    value={checkPwd}
                                    onChange={(e) => setCheckPwd(e.target.value)}
                                  ></input>
                                </PasswordModal>
                                <ButtonModals>
                                  <ButtonModal onClick={completeModalHandler}>완료</ButtonModal>
                                  <ButtonModal
                                    style={{
                                      marginLeft: '10px'
                                    }}
                                    onClick={closeModalHandler}
                                  >
                                    닫기
                                  </ButtonModal>
                                </ButtonModals>
                              </DeleteModal>
                            </>
                          ) : (
                            <>
                              <UpdateModal onClick={(e) => e.stopPropagation()}>
                                <UpdateModalInput>
                                  <UpdateModalInputWrap>
                                    <span>음식 : &nbsp;</span>
                                    <input
                                      type="text"
                                      value={newFood}
                                      onChange={(e) => setNewFood(e.target.value)}
                                    ></input>
                                  </UpdateModalInputWrap>
                                  <UpdateModalInputWrap>
                                    <span>후기 : &nbsp;</span>
                                    <input
                                      type="text"
                                      value={newComment}
                                      onChange={(e) => setNewComment(e.target.value)}
                                    ></input>
                                  </UpdateModalInputWrap>
                                  <UpdateModalInputWrap>
                                    <span>비밀번호 : &nbsp;</span>
                                    <input
                                      type="password"
                                      value={checkPwd}
                                      onChange={(e) => setCheckPwd(e.target.value)}
                                    ></input>
                                  </UpdateModalInputWrap>
                                </UpdateModalInput>
                                <ButtonModals>
                                  <ButtonModal onClick={completeModalHandler}>완료</ButtonModal>
                                  <ButtonModal
                                    style={{
                                      marginLeft: '10px'
                                    }}
                                    onClick={closeModalHandler}
                                  >
                                    닫기
                                  </ButtonModal>
                                </ButtonModals>
                              </UpdateModal>
                            </>
                          )}
                        </ModalBox>
                      ) : null}
                    </ReviewItem>
                  </>
                );
              })}
            </ReviewBox>
            {/* 글작성 div */}
            <FormBox>
              <FormInput>
                <FormRow>
                  <div>
                    <span>음식명</span>
                    <FoodInput
                      type="text"
                      value={food}
                      onChange={(e) => setFood(e.target.value)}
                      placeholder="내용을 입력해 주세요."
                    />
                  </div>
                  <div>
                    <span>비밀번호</span>
                    <PasswordInput
                      type="password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      placeholder="내용을 입력해 주세요."
                    />
                  </div>
                </FormRow>
                <FormRow>
                  <span>후기</span>
                  <ReviewInput
                    type="text"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="내용을 입력해 주세요."
                  />
                </FormRow>
              </FormInput>
              &nbsp;
              <ButtonRegistration
                onClick={() => {
                  if (food.trim() === '' || pwd.trim() === '' || comments.trim() === '') {
                    alert('음식명, 비밀번호, 후기 모두 입력해 주세요.');
                  } else {
                    const newComments = { id: nanoid(), password: pwd, title: food, review: comments };
                    mutationAdd.mutate(newComments);
                    setFood('');
                    setPwd('');
                    setComments('');
                  }
                }}
              >
                등록
              </ButtonRegistration>
            </FormBox>
          </ReviewWrap>
        </CommentWrap>
      </CommentCotainer>
    </>
  );
}
export default CommentPage;

const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewBox = styled.div`
  width: 700px;
  height: 400px;
  background-color: #fff;
  overflow: hidden;
  overflow: auto;
  justify-content: space-evenly;
  flex-direction: column;
  display: flex;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const ButtonModal = styled.button`
  border: 3px solid #ffe4c2;
  background: transparent;
  border-radius: 8px;
  color: #ff800b;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

const UpdateModal = styled.div`
  background-color: #ffffff;
  width: 300px;
  height: 200px;
  border-radius: 8px;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;
const UpdateModalInput = styled.form`
  flex-direction: column;
  display: flex;
  justify-content: space-around;
`;

const UpdateModalInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 15px;
  margin-right: 15px;
`;

const PasswordModal = styled.div`
  color: #000000;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
`;

const DeleteModal = styled.div`
  background-color: #ffffff;
  width: 300px;
  height: 150px;
  border-radius: 8p;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ModalBox = styled.div`
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const EditButtons = styled.button`
  cursor: pointer;
  margin: 0 5px;
  background-color: #fff;
  border: none;
`;

const CommentHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;
const ReviewItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const ReviewText = styled.div`
  flex: 1;
`;

const ReviewTitle = styled.p`
  font-weight: bold;
`;

const FormBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  justify-content: space-evenly;
  gap: 10px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 0.625rem;
  align-items: center;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const FoodInput = styled.input`
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: #fff;
  transition: border-color 0.3s ease;
  margin-left: 0.625rem;
`;

const PasswordInput = styled.input`
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: #fff;
  transition: border-color 0.3s ease;
  margin-left: 0.625rem;
`;

const ReviewInput = styled.input`
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: #fff;
  transition: border-color 0.3s ease;
  margin-left: 1rem;
  width: 30.75rem;
`;

const ButtonRegistration = styled.button`
  width: 4.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #ffe4c2;
  color: #ff800b;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
`;

const ButtonModals = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
