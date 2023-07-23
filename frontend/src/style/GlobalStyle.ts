import { createGlobalStyle } from 'styled-components';

import { reset } from './reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html,
  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 62.5%;
    /********** hidden scroll **********/
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  :root {

  }
`;
