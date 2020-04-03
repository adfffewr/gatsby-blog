import React from 'react';
import styled from 'styled-components';
import { palette } from './GlobalStyles';

import { FaGithubSquare } from 'react-icons/fa';
import { IoLogoGithub, IoMdMail } from 'react-icons/io';

const FooterContainer = styled.footer`
  width: 100%;
  text-align: center;
  margin-top: auto;
  padding: 20px 0;
  box-sizing: border-box;
  p {
    color: ${palette.white};
    font-size: 0.75rem;
  }
  ul li a {
    font-size: 1rem;
    display: inline-block;
    margin: 0 5px;
    color: ${palette.white};
  }
  ul li a:hover {
    color: ${palette.green};
  }
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <ul>
          <li>
            <a href="mailto:adfffewr@naver.com">
              <IoMdMail />
            </a>
            <a href="https://github.com/adfffewr" target="_blank">
              <IoLogoGithub />
            </a>
          </li>
        </ul>
        <p>© 2020 | codingpalette</p>
      </FooterContainer>
    </>
  );
};

export default Footer;
