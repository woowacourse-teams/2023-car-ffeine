import { createGlobalStyle } from 'styled-components';

import { reset } from './reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
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
