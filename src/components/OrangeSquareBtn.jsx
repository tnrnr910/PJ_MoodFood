import React from 'react';
import { styled } from 'styled-components';

function OrangeSquareBtn({ children }) {
  return (
    <>
      <OrangeSquareButton>{children}</OrangeSquareButton>
    </>
  );
}

export default OrangeSquareBtn;

const OrangeSquareButton = styled.button`
  font-weight: 800;
  font-size: 20px;

  background-color: #ff800b;
  color: #fff;

  width: 150px;
  height: 60px;
  border-radius: 15px;
  border: none;

  cursor: pointer;

  &:active,
  &:hover,
  &:focus {
    background-color: #ffe4c2;
    color: #ff800b;
  }
`;
