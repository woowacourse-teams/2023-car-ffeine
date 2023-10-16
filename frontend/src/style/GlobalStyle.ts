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

  &::-webkit-scrollbar {
    display: none;
  }

  :root {
    --light-color: #e9edf8;
    --lighter-color: #eef0f5;

    --gray-200-color: #ebebeb;
  }

  body:has(.modal-open) {
    overflow: hidden;
  }
  body:has(#page-404) {
    background: #7e76e5;
  }

  button.gm-ui-hover-effect {
    visibility: hidden;
  }

  div.gm-style .gm-style-iw-c {
    padding: 0;
  }

  button:focus, button:active {
    outline: none;
  }
`;
