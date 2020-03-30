import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { palette } from './GlobalStyles';

const HeaderBox = styled.header`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  left: 0;
  top: 0;
  padding: 2rem;
  background-color: rgba(31, 41, 51, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  a {
    font-size: 0.9rem;
  }
  @media screen and (min-width: 768px) {
    margin-top: 2rem;
    max-width: 900px;
  }
`;
const NavBox = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled(Link)`
  color: ${palette.white};
`;
const LinkTag = styled(Link)`
  color: ${palette.green};
  transition: color 0.2s;
  &:hover {
    color: ${palette.white};
  }
`;
const NavListBox = styled.ul`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  li {
    margin: 0 15px;
  }
`;

const Header = () => {
  return (
    <>
      <HeaderBox>
        <NavBox>
          {/* <h1>
            <Logo to="/">CodingPalette</Logo>
          </h1> */}
          <NavListBox>
            <li>
              <LinkTag to="/">Post</LinkTag>
            </li>
            {/* <li>
              <LinkTag to="/">About</LinkTag>
            </li> */}
          </NavListBox>
        </NavBox>
      </HeaderBox>
    </>
  );
};

export default Header;
