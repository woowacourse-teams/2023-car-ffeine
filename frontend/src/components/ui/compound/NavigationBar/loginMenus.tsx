import { ArrowRightOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

import type { PropsWithChildren } from 'react';

import { logout } from '@utils/login';

export const loginMenus: PropsWithChildren<{ onClick: () => void }>[] = [
  {
    children: (
      <>
        <PencilSquareIcon width="1.8rem" color="#333" />
        차량등록
      </>
    ),
    onClick: () => alert('차량등록'),
  },
  {
    children: (
      <>
        <ArrowRightOnRectangleIcon width="1.8rem" color="#333" />
        로그아웃
      </>
    ),
    onClick: logout,
  },
];
