import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { palette } from './GlobalStyles';

const HeaderBox = styled.header`
  width: 100%;
  position: sticky;
  left: 0;
  top: 0;
  background-color: rgba(47, 52, 55, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  z-index: 1000;
`;
const HeaderContent = styled.div`
  padding: 2rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  box-sizing: border-box;
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

const LinkTag = styled(Link)`
  color: ${palette.green};
  transition: 0.2s;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.25rem;
  &:hover {
    color: ${palette.white};
    background-color: rgb(71, 78, 80);
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
        <HeaderContent>
          <NavBox>
            <NavListBox>
              <li>
                <LinkTag to="/">Post</LinkTag>
              </li>
              {/* <li>
                <LinkTag to="/">About</LinkTag>
              </li> */}
            </NavListBox>
          </NavBox>
        </HeaderContent>
      </HeaderBox>
    </>
  );
};

export default Header;
