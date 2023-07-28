import { createGlobalStyle } from 'styled-components';

import { reset } from './reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    font-family: 'Noto Sans KR', sans-serif !important;
  }

  html,
  body {
    font-size: 62.5%;
    /********** hidden scroll **********/
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  :root {

  }

  body:has(.modal-open) {
    overflow: hidden;
  }
`;
