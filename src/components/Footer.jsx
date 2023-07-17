import React from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <Foot>
        © 2023 MoodFood powered by 이8청춘 &nbsp;
        <GitLink target="_blank" to="https://github.com/tnrnr910/PJ_MoodFood.git">
          <FontAwesomeIcon icon={faGithub} />
        </GitLink>
      </Foot>
    </>
  );
}

export default Footer;

const Foot = styled.div`
  width: 100vw;
  height: 70px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ff800b;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const GitLink = styled(Link)`
  color: #000;
`;
