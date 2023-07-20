import { createGlobalStyle } from 'styled-components';

import { reset } from './reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
    /********** hidden scroll **********/
  html,
  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 62.5%;
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  :root {

  }
`;
