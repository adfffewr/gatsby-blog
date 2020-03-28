import React from 'react';
import { GlobalStyles } from './common/GlobalStyles';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <main>{children}</main>
    </>
  );
};

export default Layout;
