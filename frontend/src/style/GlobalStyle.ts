import { createGlobalStyle } from 'styled-components';

import { reset } from './reset';

export const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

  ${reset}

  * {
    font-family: "Noto Sans KR", sans-serif !important;
  }
  
  /********** hidden scroll **********/
  html,
  body {
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  :root {
    
  }
`;
