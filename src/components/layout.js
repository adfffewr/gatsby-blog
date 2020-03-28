import React from 'react';
import { GlobalStyles } from './common/GlobalStyles';
import Header from './common/Header';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
