import * as process from 'process';
import { router } from 'router';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { configureToken } from '@utils/configureToken';
import { getAPIEndPoint } from '@utils/login';
import { getSessionStorage } from '@utils/storage';

import { mswModeActions } from '@stores/config/mswModeStore';
import { memberInfoAction } from '@stores/login/memberInfoStore';
import { memberTokenActions } from '@stores/login/memberTokenStore';

import { GlobalStyle } from 'style/GlobalStyle';

import { SESSION_KEY_MEMBER_TOKEN, SESSION_KEY_MEMBER_INFO } from '@constants/storageKeys';

const queryClient = new QueryClient();

const { setMemberToken } = memberTokenActions;
const { setMemberInfo } = memberInfoAction;
const memberToken = getSessionStorage(SESSION_KEY_MEMBER_TOKEN, '');
const memberInfo = getSessionStorage(SESSION_KEY_MEMBER_INFO, '');

if (memberToken !== '' && memberInfo !== '') {
  setMemberToken(memberToken);
  setMemberInfo(JSON.parse(memberInfo));
}

const main = async () => {
  if (process.env.NODE_ENV === 'development' && getAPIEndPoint() === 'http://localhost:8080/api') {
    await mswModeActions.startMsw();
  }

  const domNode = document.getElementById('root');
  const root = createRoot(domNode);

  root.render(
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

configureToken();
main();
