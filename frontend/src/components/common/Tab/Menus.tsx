import type { PropsWithChildren } from 'react';
import { useContext } from 'react';

import type { FlexBoxProps } from '@common/FlexBox/FlexBox';
import FlexBox from '@common/FlexBox/FlexBox';

import { TabContext } from './Tab';
import { menuContainerStyle } from './styles/menus.style';

export interface MenusProps extends FlexBoxProps {
  layout?: never;
  /** 선택된 탭 메뉴를 강조하는 색깔 변경 가능
   * @default #000
   */
  highlightColor?: string;
  /** 선택된 탭 메뉴 아래에 선 제거 가능
   * @default false
   */
  noUnderline?: boolean;
  /** [true] 메뉴 이름이 탭 메뉴의 너비보다 길 경우 말 줄임표(...) 표시
   * @default false
   */
  lineClamp?: boolean;
}

const Menus = ({
  highlightColor = '#000',
  children,
  gap,
  noUnderline = false,
  lineClamp = false,
  ...attributes
}: PropsWithChildren<MenusProps>) => {
  const { vertical } = useContext(TabContext);

  return (
    <FlexBox
      role="tablist"
      aria-label="탭 메뉴"
      width={vertical ? 'fit-content' : '100%'}
      direction={vertical ? 'column' : 'row'}
      justify={vertical ? 'start' : 'space-between'}
      gap={gap}
      noRadius="all"
      css={menuContainerStyle({ highlightColor, noUnderline, vertical, lineClamp })}
      {...attributes}
    >
      {children}
    </FlexBox>
  );
};

export default Menus;
