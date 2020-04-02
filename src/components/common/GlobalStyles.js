import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
export const GlobalStyles = createGlobalStyle`
  ${reset};  
  @font-face { font-family: 'NanumBarunGothic'; font-style: normal; font-weight: 400; src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot'); src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf') format('truetype'); } 
  @font-face { font-family: 'NanumBarunGothic'; font-style: normal; font-weight: 700; src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot'); src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.ttf') format('truetype') } 
  @font-face { font-family: 'NanumBarunGothic'; font-style: normal; font-weight: 300; src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot'); src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.ttf') format('truetype'); } 
  
  html {
    font-size:15px;
  }
  body {
    background-color: rgb(47, 52, 55);
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
    line-height: 1.65;
    font-family: 'NanumBarunGothic', sans-serif;
  }
  main {
    max-width:700px;
    width:100%;
    margin:0 auto;
    padding-left:2rem;
    padding-right:2rem;
    box-sizing:border-box;
  }
  a{
    text-decoration:none;
  }
  @media screen and (min-width:768px) {
    html {
      font-size:18px;
    }
  }
  
`;

export const palette = {
  white: 'rgba(255, 255, 255, 0.9)',
  black: 'rgb(55, 53, 47);',
  green: 'rgb(77,171,154)',
};
