import { fireEvent, render, screen } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { memberTokenStore } from '@stores/login/memberTokenStore';

import ModalContainer from '@ui/ModalContainer';
import NavigationBar from '@ui/compound/NavigationBar';

const queryClient = new QueryClient();

describe('Navigator 컴포넌트 테스트', () => {
  it('멤버 토큰이 없을 때 프로필 버튼을 누르면 로그인 모달이 렌더링 된다.', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModalContainer />
        <NavigationBar.Menu />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByLabelText('로그인 하기'));

    expect(screen.getByText('구글 로그인')).toBeInTheDocument();
  });

  it('멤버 토큰이 있을 때 프로필 버튼을 누르면 프로필 메뉴가 렌더링 된다.', () => {
    memberTokenStore.setState('test-member-token');

    render(
      <QueryClientProvider client={queryClient}>
        <ModalContainer />
        <NavigationBar.Menu />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByLabelText('프로필 메뉴 열기'));

    expect(screen.getByText('차량등록')).toBeInTheDocument();
    expect(screen.getByText('로그아웃')).toBeInTheDocument();
  });
});
