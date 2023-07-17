import React from 'react';
import { styled } from 'styled-components';
import logo_white from '../asset/logo_white.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const onToMain = () => {
    navigate('/');
  };
  return (
    <>
      <HeaderWrap>
        <Head>
          <ImgLogo onClick={onToMain} src={logo_white} alt="LogoImage" />
        </Head>
      </HeaderWrap>
    </>
  );
}

export default Header;

const Head = styled.div`
  background-color: #ff800b;
  width: 100vw;
  height: 100px;
  position: fixed;
  top: 0;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const ImgLogo = styled.img`
  width: 130px;
  height: auto;
  cursor: pointer;
`;
const HeaderWrap = styled.div`
  overflow: hidden;
`;
