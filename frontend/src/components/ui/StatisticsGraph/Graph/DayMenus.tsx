import type { ReactNode } from 'react';

import FlexBox from '@common/FlexBox';

export interface DayMenusProps {
  menus: string[];
  renderMenuSelectButton: (menu: string) => ReactNode;
}

const DayMenus = ({ menus, renderMenuSelectButton }: DayMenusProps) => {
  return (
    <FlexBox nowrap width="100%" justifyContent="between" gap={0}>
      {menus.map((menu) => renderMenuSelectButton(menu))}
    </FlexBox>
  );
};

export default DayMenus;
