import { fireEvent, render, screen } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { memberTokenStore } from '@stores/login/memberTokenStore';

import { useCars } from '@hooks/tanstack-query/car/useCars';

import ModalContainer from '@ui/ModalContainer';
import NavigationBar from '@ui/compound/NavigationBar';

import { EMPTY_MEMBER_TOKEN } from '@constants';

jest.mock('@hooks/tanstack-query/car/useCars');

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

  it('로그아웃 버튼을 클릭하면 저장해두었던 멤버 토큰이 지워진다.', () => {
    memberTokenStore.setState('test-member-token');

    render(
      <QueryClientProvider client={queryClient}>
        <ModalContainer />
        <NavigationBar.Menu />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByLabelText('프로필 메뉴 열기'));
    fireEvent.click(screen.getByText('로그아웃'));

    expect(memberTokenStore.getState()).toBe(EMPTY_MEMBER_TOKEN);
  });

  it('차량 등록 버튼을 클릭하면 차량 선택 모달이 렌더링 된다.', async () => {
    (useCars as jest.Mock).mockReturnValue({
      data: [
        {
          carId: 1,
          name: 'dummy car1',
          vintage: 'dummy vintage1',
        },
        {
          carId: 2,
          name: 'dummy car2',
          vintage: 'dummy vintage2',
        },
        {
          carId: 3,
          name: 'dummy car3',
          vintage: 'dummy vintage3',
        },
      ],
      isLoading: false,
    });
    memberTokenStore.setState('test-member-token');

    render(
      <QueryClientProvider client={queryClient}>
        <ModalContainer />
        <NavigationBar.Menu />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByLabelText('프로필 메뉴 열기'));
    fireEvent.click(screen.getByText('차량등록'));

    expect(screen.getByText('차량 선택')).toBeInTheDocument();
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
