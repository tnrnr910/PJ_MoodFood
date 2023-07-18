import React from 'react';
import { styled } from 'styled-components';

function ApricotSquareBtn({ children }) {
  return (
    <>
      <ApricotSquareButton>{children}</ApricotSquareButton>
    </>
  );
}

export default ApricotSquareBtn;

const ApricotSquareButton = styled.button`
  font-weight: 800;
  font-size: 20px;

  background-color: #ffe4c2;
  color: #ff800b;

  width: 150px;
  height: 60px;
  border-radius: 15px;
  border: none;

  cursor: pointer;

  &:active,
  &:hover,
  &:focus {
    background-color: #ff800b;
    color: #fff;
  }
`;
