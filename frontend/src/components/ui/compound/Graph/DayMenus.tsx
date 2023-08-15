import type { ReactNode } from 'react';

import FlexBox from '@common/FlexBox';

import type { GraphProps } from '.';

export interface DayMenusProps extends Omit<GraphProps, 'align'> {
  menus: string[];
  renderMenuSelectButton: (menu: string) => ReactNode;
}

const DayMenus = ({ menus, renderMenuSelectButton }: DayMenusProps) => {
  return <FlexBox gap={0}>{menus.map((menu) => renderMenuSelectButton(menu))}</FlexBox>;
};

export default DayMenus;
