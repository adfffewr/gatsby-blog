import React from 'react';
import styled from 'styled-components';
import { GlobalStyles } from './common/GlobalStyles';
import Header from './common/Header';
import Footer from './common/Footer';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Header />
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
